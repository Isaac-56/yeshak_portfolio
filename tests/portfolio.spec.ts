import { test, expect } from '@playwright/test';

const projects = ['baby-nest','reclaim','yenebet','medical-app','directed','blog-app','sarabi'];

test('hero, theme alignment, bird animations and featured previews', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/Yeshak Tsegaye/})).toBeVisible();
  await expect(page.locator('.hero-birds .gull')).toHaveCount(6);
  await expect(page.locator('.works-featured .work-card')).toHaveCount(3);
  await expect(page.locator('.works-explorations .work-card')).toHaveCount(4);
  await expect(page.locator('.works-featured video')).toHaveCount(3);
  const light=await page.locator('.light-scene').boundingBox();
  const dark=await page.locator('.dark-scene').boundingBox();
  expect(light).toEqual(dark);
  await page.getByRole('button',{name:/Activate illustrated night mode/}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await expect(page.locator('.dark-scene')).toHaveCSS('opacity','1');
  await expect(page.locator('.hero-birds .gull')).toHaveCount(6);
  await page.getByRole('button',{name:/Activate photographic light mode/}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  const birdAnimation=await page.locator('.hero-flock-distant').evaluate(el=>getComputedStyle(el).animationName);
  expect(birdAnimation).toContain('corner-bird-drift');
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

test('full-screen work gallery changes project scenes through controls and keyboard', async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/work');
  await expect(page.locator('.archive-panel')).toHaveCount(7);
  await expect(page.locator('.showcase-index button')).toHaveCount(7);
  await expect(page.locator('.showcase-slide.showcase-current .showcase-project-name')).toHaveText('Baby Nest');
  await page.screenshot({path:'test-results/showcase-babynest-desktop.png'});
  await expect(page.locator('.showcase-slide.showcase-current .showcase-phones img')).toHaveCount(3);
  await page.getByRole('button',{name:'Next project'}).click();
  await expect(page.locator('.showcase-slide.showcase-current .showcase-project-name')).toHaveText('Reclaim');
  await page.waitForTimeout(850);
  await page.screenshot({path:'test-results/showcase-reclaim-desktop.png'});
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.showcase-slide.showcase-current .showcase-project-name')).toHaveText('Yene Bet');
  await page.getByRole('button',{name:'Show Sarabi Restaurant'}).click();
  await expect(page.locator('.showcase-slide.showcase-current .showcase-project-name')).toHaveText('Sarabi Restaurant');
  await expect(page.locator('.showcase-slide.showcase-current .showcase-feature-browser img')).toBeVisible();
  await page.locator('.showcase-slide.showcase-current').getByRole('link',{name:'Open Sarabi Restaurant case study'}).click();
  await expect(page).toHaveURL(/\/work\/sarabi$/);
});

test('cinematic work gallery scroll, theme switch and small viewport layout',async({page})=>{
  await page.setViewportSize({width:1360,height:860});
  await page.goto('/work');
  await expect(page.locator('.showcase-stage')).toBeVisible();
  await page.locator('.showcase-stage').hover({position:{x:560,y:440}});
  await page.mouse.wheel(0,600);
  await expect(page.locator('.showcase-slide.showcase-current .showcase-project-name')).toHaveText('Reclaim');
  await expect(page.locator('.showcase-stage')).toHaveCSS('background-color','rgb(70, 105, 128)');
  await page.getByRole('button',{name:/Activate illustrated night mode/}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.setViewportSize({width:390,height:844});
  await expect(page.locator('.showcase-slide.showcase-current .showcase-project-name')).toBeVisible();
  await page.screenshot({path:'test-results/showcase-mobile-dark.png'});
  const width=await page.evaluate(()=>({page:document.documentElement.scrollWidth,window:innerWidth}));
  expect(width.page).toBeLessThanOrEqual(width.window+2);
  await page.getByRole('button',{name:'Next project'}).click();
  await expect(page.locator('.showcase-slide.showcase-current .showcase-project-name')).toHaveText('Yene Bet');
});

for (const slug of projects) {
  test(`case study loads, frames remain inside viewport, fullscreen viewer works: ${slug}`, async ({page}) => {
    await page.goto(`/work/${slug}`);
    await expect(page.locator('.case-heading h1')).toBeVisible();
    await expect(page.locator('.screen-card').first()).toBeVisible();
  const firstCard=page.locator('.screen-card').first();
  if(await firstCard.locator('.screen-view-toggle').count()){
    await firstCard.getByRole('button',{name:'Full design'}).click();
    await expect(firstCard.locator('.device-frame')).toHaveClass(/device-frame-full/);
    await firstCard.getByRole('button',{name:'Scroll inside'}).click();
    await expect(firstCard.locator('.device-frame')).not.toHaveClass(/device-frame-full/);
  }
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
  await expect(page.locator('#contact-name')).toBeVisible();
  await expect(page.locator('#contact-email')).toBeVisible();
  await expect(page.locator('#contact-subject')).toBeVisible();
  await expect(page.locator('#contact-message')).toBeVisible();
  await page.getByRole('button',{name:/Send message/}).click();
  await expect(page.locator('.contact-success')).toHaveCount(0);
  await page.locator('#contact-name').fill('Preview tester');
  await page.locator('#contact-email').fill('preview@example.com');
  await page.locator('#contact-subject').fill('Preview test');
  await page.locator('#contact-message').fill('This is a simulated test, not a real email.');
  await page.route('**/api.emailjs.com/**',route=>route.fulfill({
    status:200, contentType:'application/json', body:JSON.stringify({status:200,text:'OK'}),
    headers:{'access-control-allow-origin':'*'}
  }));
  await page.getByRole('button',{name:/Send message/}).click();
  await expect(page.getByText('Message sent.')).toBeVisible({timeout:15000});
  await page.getByRole('button',{name:/Send another message/}).click();
  await expect(page.locator('#contact-name')).toBeVisible();
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
  await expect(page.locator('.hero-birds .gull')).toHaveCount(6);
});


test('internal navigation runs the Yeshak-branded cover and reveal sequence',async ({page})=>{
  await page.goto('/');
  await expect(page.locator('.preloader')).toHaveClass(/preloader-finished/);
  await page.locator('.desktop-links a[href="/about"]').click();
  await expect(page.locator('.page-transition-overlay')).toBeVisible();
  await expect(page.locator('.page-transition-center')).toContainText('About');
  await expect(page.locator('.page-transition-signature')).toContainText('Yeshak');
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('.page-transition-overlay')).toHaveCount(0,{timeout:5000});
  await page.locator('.desktop-links a[href="/work"]').click();
  await expect(page.locator('.page-transition-center')).toContainText('Work');
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator('.page-transition-overlay')).toHaveCount(0,{timeout:5000});
  await page.locator('.desktop-links a[href="/contact"]').click();
  await expect(page.locator('.page-transition-center')).toContainText('Contact');
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('.page-transition-overlay')).toHaveCount(0,{timeout:5000});
});

test('Sarabi uses tablet presentation and automatically scrolls until hovered',async ({page})=>{
  await page.goto('/work/sarabi');
  const first=page.locator('.screen-card').first();
  await expect(first.locator('.device-frame-tablet')).toBeVisible();
  await expect(first.locator('.device-scroller img')).toHaveAttribute('src','/projects/sarabi/tablet-preview.webp');
  await expect(first.getByRole('button',{name:'Scroll inside'})).toHaveAttribute('aria-pressed','true');
  const scroller=first.locator('.device-scroller');
  await scroller.scrollIntoViewIfNeeded();
  await expect(scroller.locator('img')).toBeVisible();
  await page.waitForTimeout(1800);
  const before=await scroller.evaluate(el=>el.scrollTop);
  expect(before).toBeGreaterThan(10);
  await scroller.hover();
  const pausedAt=await scroller.evaluate(el=>el.scrollTop);
  await page.waitForTimeout(700);
  const during=await scroller.evaluate(el=>el.scrollTop);
  expect(Math.abs(during-pausedAt)).toBeLessThan(3);
  await page.locator('.case-heading h1').hover();
  await page.waitForTimeout(200);
  const after=await scroller.evaluate(el=>el.scrollTop);
  expect(after).toBeLessThan(25);
});

test('birds remain within the upper-right sky stage, never crossing the person',async ({page})=>{
  await page.goto('/');
  const stage=await page.locator('.hero-birds').boundingBox();
  const hero=await page.locator('.hero').boundingBox();
  expect(stage).not.toBeNull();expect(hero).not.toBeNull();
  if(!stage||!hero)return;
  expect(stage.x).toBeGreaterThan(hero.x+hero.width*.45);
  expect(stage.y).toBeLessThan(hero.y+hero.height*.45);
  const style=await page.locator('.hero-flock-distant').evaluate(el=>getComputedStyle(el).animationName);
  expect(style).toMatch(/corner-bird-drift/);
});

test('homepage all-work link opens the immersive archive', async ({page})=>{
  await page.goto('/');
  await page.getByRole('link',{name:/Explore every project/}).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator('.archive-panel')).toHaveCount(7);
});

test('desktop hero navigation is visibly larger', async ({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  const sizes=await page.locator('.desktop-links a').evaluateAll(anchors=>anchors.map(el=>parseFloat(getComputedStyle(el).fontSize)));
  expect(sizes).toHaveLength(3);
  expect(Math.min(...sizes)).toBeGreaterThanOrEqual(20);
});

test('contact form clearly explains provider errors instead of claiming success', async ({page})=>{
  await page.goto('/contact');
  await page.locator('#contact-name').fill('Test User');
  await page.locator('#contact-email').fill('test@example.com');
  await page.locator('#contact-subject').fill('Test');
  await page.locator('#contact-message').fill('No real message will be sent.');
  await page.route('**/api.emailjs.com/**', route=>route.fulfill({
    status:403,contentType:'text/plain',body:'Origin is blocked by allowlist.',
    headers:{'access-control-allow-origin':'*'}
  }));
  await page.getByRole('button',{name:/Send message/}).click();
  await expect(page.locator('.contact-error')).toContainText('403',{timeout:10000});
  await expect(page.locator('.contact-success')).toHaveCount(0);
});


test('hero living motion stays layered within portrait and honors reduced motion',async ({page})=>{
 await page.goto('/');
 await expect(page.locator('.hero-living-elements')).toBeVisible();
 await expect(page.locator('.hero-water-motion')).toHaveCount(2);
 await expect(page.locator('.hero-fabric-motion')).toHaveCount(2);
 const wave=await page.locator('.hero-water-light').evaluate(el=>getComputedStyle(el).animationName);
 expect(wave).toContain('hero-wave-life');
 await page.getByRole('button',{name:/Activate illustrated night mode/}).click();
 await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.hero-water-dark')).toBeHidden();
});

test('full Yeshak Tsegaye hero heading never clips off either viewport edge',async ({page})=>{
 for(const viewport of [{width:1290,height:900},{width:1440,height:900},{width:768,height:950},{width:390,height:844},{width:360,height:780}]){
   await page.setViewportSize(viewport);
   await page.goto('/');
   await expect(page.locator('.hero-title')).toBeVisible();
   await page.waitForTimeout(2400);
   const result=await page.locator('.hero-title').evaluate(el=>{
     const heading=el.getBoundingClientRect();
     const text=(el.querySelector('span')||el).getBoundingClientRect();
     return {outerLeft:heading.left,outerRight:heading.right,textLeft:text.left,textRight:text.right,viewport:window.innerWidth,scrollWidth:document.documentElement.scrollWidth};
   });
   expect(result.outerLeft,`Hero heading overflows left at ${viewport.width}`).toBeGreaterThanOrEqual(-2);
   expect(result.outerRight,`Hero heading overflows right at ${viewport.width}`).toBeLessThanOrEqual(result.viewport+2);
   expect(result.textLeft,`Name text clips at left edge at ${viewport.width}`).toBeGreaterThanOrEqual(-2);
   expect(result.textRight,`Name text clips at right edge at ${viewport.width}`).toBeLessThanOrEqual(result.viewport+2);
   expect(result.scrollWidth,`Horizontal overflow at ${viewport.width}`).toBeLessThanOrEqual(result.viewport+2);
 }
});

test('site always opens in light mode even after a previously stored dark preference',async ({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem('yt-theme-final','dark');
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(page.locator('html')).toHaveCSS('color-scheme','light');
  await page.getByRole('button',{name:/Activate illustrated night mode/}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
});
