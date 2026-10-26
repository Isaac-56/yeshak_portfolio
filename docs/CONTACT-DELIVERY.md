# Contact form delivery — EmailJS

The V3 React contact form sends through the same EmailJS account used by the original main-branch portfolio.

## Verified root cause — 2026-10-26

A single real API request was made to the existing EmailJS service from GitHub Actions. The provider responded:

- **HTTP 412**
- **Gmail_API: Invalid grant. Please reconnect your Gmail account**

This is **not a React, CSS, or form-validation failure**. The Gmail OAuth authorization used by the EmailJS service is expired or revoked. No change in this public repository can silently reauthorize someone else's Gmail session.

## Required account-owner action

1. Sign into https://dashboard.emailjs.com/admin with the account that owns the contact form service.
2. Open **Email Services** and select the Gmail service with ID `service_wkr4ycf`.
3. Reconnect / Reauthorize Gmail and approve the requested Google permissions.
4. Use the EmailJS service's own **Test** feature to send a message to yourself and confirm receipt.
5. Open the portfolio's **Contact** page and submit one message. Verify it arrives.
6. If the service reports an origin error after reconnecting, inspect **Domains / Allowed origins** in the EmailJS dashboard. Allow the exact development origin `http://localhost:5173` for local testing and the production site origin when deployed. Never use an arbitrary wildcard without considering spam exposure.

The existing email template ID is `template_rmpnv3v`; verify its **To Email** recipient is your intended inbox and **Reply-To** points to `{{reply_to}}` or `{{user_email}}`.

Do not put a Gmail password, an EmailJS private key, or a refresh token into GitHub source files or Vite environment variables starting with `VITE_`: these are exposed to browsers.

## Form behavior

The form sends a single EmailJS request containing common template variable names:
`user_name`, `user_email`, `subject`, `message`, `from_name`, `from_email`, `reply_to`, `name`, `email`, `title`, and `time`.

It displays delivery confirmation **only** after EmailJS returns success.
When delivery is blocked, the draft is preserved and the visitor can choose **Open your email app with this message** as an explicit manual fallback.

The repository includes a one-time provider diagnostic workflow, which failed at the provider with 412. Its failure is expected until Gmail has been reauthorized. Ordinary production and browser tests mock EmailJS responses so they do not send repeated mail.
