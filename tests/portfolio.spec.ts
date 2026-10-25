import { test, expect } from '@playwright/test';

const projects = ['baby-nest','reclaim','yenebet','medical-app','directed','blog-app','sarabi'];

test('hero, theme alignment, bird animations and featured previews', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/Yeshak Tsegaye/})).toBeVisible();
  await expect(page.locator('.hero-birds .gull')).toHaveCount(9);
  await expect(page.locator('.works-featured .work-card')).toHaveCount(3);
  await expect(page.locator('.works-explorations .work-card')).toHaveCount(4);
  await expect(page.locator('.works-featured video')).toHaveCount(3);
  const light=await page.locator('.light-scene').boundingBox();
  const dark=await page.locator('.dark-scene').boundingBox();
  expect(light).toEqual(dark);
  await page.getByRole('button',{name:/Activate illustrated night mode/}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await expect(page.locator('.dark-scene')).toHaveCSS('opacity','1');
  await expect(page.locator('.hero-birds .gull')).toHaveCount(9);
  await page.getByRole('button',{name:/Activate photographic light mode/}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  const birdAnimation=await page.locator('.hero-flock-distant').evaluate(el=>getComputedStyle(el).animationName);
  expect(birdAnimation).toContain('coastal-fly');
});

test('animated menu, keyboard navigation and route transitions', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button',{name:'Open menu'}).click();
  await expect(page.getByRole('dialog',{name:'Site navigation'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button',{name:'Open menu'})).toBeVisible();
  await page.getByRole('button',{name:'Open menu'}).click();
  await page.getByRole('dialog',{name:'Site navigation'}).getByRole('link',{name:/About/}).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading',{name:/More than/})).toBeVisible();
  await page.locator('.about-services .service-row').first().scrollIntoViewIfNeeded();
  await expect(page.locator('.about-services .service-row').first()).toHaveClass(/is-visible/);
});

test('work page, featured hierarchy and navigation', async ({page}) => {
  await page.goto('/work');
  await expect(page.locator('.works-featured .work-card')).toHaveCount(3);
  await expect(page.locator('.works-explorations .work-card')).toHaveCount(4);
  await page.locator('.works-featured .work-card').first().click();
  await expect(page).toHaveURL(/\/work\/baby-nest$/);
});

for (const slug of projects) {
  test(`case study loads, frames remain inside viewport, fullscreen viewer works: ${slug}`, async ({page}) => {
    await page.goto(`/work/${slug}`);
    await expect(page.locator('.case-heading h1')).toBeVisible();
    await expect(page.locator('.screen-card').first()).toBeVisible();
    await expect(page.locator('.device-frame').first()).toBeVisible();
    const content = await page.locator('.device-scroller').first().evaluate(el=>({
      clientWidth:el.clientWidth,
      imageWidth:el.querySelector('img')?.getBoundingClientRect().width||0,
    }));
    expect(content.imageWidth).toBeLessThanOrEqual(content.clientWidth+2);
    await page.locator('.screen-details button').first().click();
    await expect(page.getByRole('dialog',{name:/full screen viewer/})).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.lightbox-count')).toContainText('2 /');
    await page.keyboard.press('Escape');
    await expect(page.locator('.lightbox')).toHaveCount(0);
    await expect(page.locator('.next-project a')).toBeVisible();
  });
}

test('contact form preserves fields, validates required values, and reports successful EmailJS response', async ({page}) => {
  await page.goto('/contact');
  await expect(page.getByLabel('Name')).toBeVisible();
  await expect(page.getByLabel('Email', {exact:true})).toBeVisible();
  await expect(page.getByLabel('Subject')).toBeVisible();
  await expect(page.getByLabel('Message')).toBeVisible();
  await page.getByRole('button',{name:/Send message/}).click();
  await expect(page.locator('.contact-success')).toHaveCount(0);
  await page.getByLabel('Name').fill('Preview tester');
  await page.getByLabel('Email',{exact:true}).fill('preview@example.com');
  await page.getByLabel('Subject').fill('Preview test');
  await page.getByLabel('Message').fill('This is a simulated test, not a real email.');
  await page.route('**/api.emailjs.com/**',route=>route.fulfill({
    status:200, contentType:'application/json', body:JSON.stringify({status:200,text:'OK'}),
    headers:{'access-control-allow-origin':'*'}
  }));
  await page.getByRole('button',{name:/Send message/}).click();
  await expect(page.getByText('Message sent.')).toBeVisible({timeout:15000});
  await page.getByRole('button',{name:/Send another message/}).click();
  await expect(page.getByLabel('Name')).toBeVisible();
});

test('mobile viewport stays in bounds on main pages',async ({page})=>{
  await page.setViewportSize({width:390,height:844});
  for (const route of ['/','/work','/about','/contact','/work/baby-nest']) {
    await page.goto(route);
    const dimensions = await page.evaluate(()=>({inner:window.innerWidth, scroll:document.documentElement.scrollWidth}));
    expect(dimensions.scroll,`Horizontal overflow on ${route}`).toBeLessThanOrEqual(dimensions.inner+2);
  }
});

test('reduced motion disables decorative animation',async ({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const animation=await page.locator('.hero-flock-distant').evaluate(el=>getComputedStyle(el).animationName);
  expect(animation).toBe('none');
  await expect(page.locator('.hero-birds .gull')).toHaveCount(9);
});
