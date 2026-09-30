# 📧 Google Gmail REST API Configuration Guide

A comprehensive, step-by-step guide to setting up and configuring the **Google Gmail REST API** for password reset emails on the **Limu Kosa Woreda Government Portal & Administration CMS**.

---

## 🎯 Why Gmail REST API (Instead of Standard SMTP)?

Cloud hosting platforms like **Render**, **AWS**, and **DigitalOcean** block outgoing direct TCP socket connections on raw SMTP ports (**25, 465, and 587**) to prevent spam abuse. Attempting to use regular SMTP on these hosts causes `ETIMEDOUT` (connection timeout) errors.

To solve this, our backend uses the **Google Gmail REST API over HTTPS (Port 443)**:
- **Port 443 (HTTPS)** is standard web traffic and is **never blocked** by Render or any cloud provider.
- Sends real emails directly from your Gmail account to **any recipient email address** (`@gmail.com`, `@yahoo.com`, official government emails, etc.).
- **100% Free** (up to 500 emails/day, which is more than enough for admin password resets).

---

## 📋 Required Environment Variables

Once configured, you will add these 4 keys to your backend environment (on **Render Dashboard** or local `.env`):

| Variable Key | Description | Example |
| :--- | :--- | :--- |
| `GMAIL_CLIENT_ID` | OAuth 2.0 Client ID from Google Cloud | `1234567890-abc...apps.googleusercontent.com` |
| `GMAIL_CLIENT_SECRET` | OAuth 2.0 Client Secret from Google Cloud | `GOCSPX-xyz...` |
| `GMAIL_REFRESH_TOKEN` | Permanent token used to refresh access tokens | `1//04abc...` |
| `GMAIL_USER` | The Gmail address sending the emails | `your-email@gmail.com` |

---

## 🚀 Step-by-Step Setup Guide

---

### Step 1: Create a Project & Enable the Gmail API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and sign in with your Google account.
2. In the top navigation bar, click the **Project Dropdown** > **New Project**:
   - **Project Name**: `Limu Kosa Email` (or any name you choose)
   - Click **Create**.
3. Make sure your new project is selected in the top project dropdown.
4. In the top search bar, type **`Gmail API`** and select it from the results.
5. Click the blue **Enable** button.

---

### Step 2: Configure the OAuth Consent Screen

Google requires an OAuth consent screen to define what user account sends the emails.

1. In the left navigation menu, click **APIs & Services** > **OAuth consent screen** (or **Branding**).
2. Choose **External** for User Type and click **Create**.
3. Fill in the required fields:
   - **App name**: `Limu Kosa CMS`
   - **User support email**: *Select your Gmail address from the dropdown*
   - **Developer contact information**: *Type your Gmail address*
4. Click **Save and Continue**.
5. On the **Scopes** page:
   - Click **Save and Continue** (no custom scopes needed here).
6. On the **Audience / Test users** page:
   - Click **+ Add users**.
   - Enter your Gmail address (the one you will use to send emails, e.g. `your-email@gmail.com`).
   - Click **Save**.
7. Click **Save and Continue** > **Back to Dashboard**.

> [!NOTE]
> If Google Cloud Console displays the new layout, you can find the Test Users setting by clicking **OAuth consent screen** in the left menu, then selecting the **Audience** tab.

---

### Step 3: Create OAuth 2.0 Credentials (Client ID & Secret)

1. In the left navigation menu, click **Credentials**.
2. Click **+ Create Credentials** at the top > select **OAuth client ID**.
3. Fill in the form:
   - **Application type**: Select **Web application**.
   - **Name**: `Limu Kosa Web Client` (default is fine).
   - Scroll down to **Authorized redirect URIs** > click **+ Add URI**.
   - Paste this exact URL:
     ```text
     https://developers.google.com/oauthplayground
     ```
     *(Make sure there are no spaces or trailing slashes).*
4. Click **Create**.
5. A modal dialog will appear displaying:
   - **Your Client ID**
   - **Your Client Secret**
6. Copy both values to a notepad.

---

### Step 4: Generate the Refresh Token (OAuth Playground)

To allow your backend on Render to send emails automatically without requiring you to log in every hour, you need a long-lived **Refresh Token**.

1. Open the [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) in your browser.
2. In the top-right corner, click the **Gear icon (OAuth 2.0 configuration)**:
   - Check the box **"Use your own OAuth credentials"**.
   - In **OAuth Client ID**, paste your Client ID from Step 3.
   - In **OAuth Client Secret**, paste your Client Secret from Step 3.
   - Leave other settings as default.
3. On the left side under **Step 1: Select & authorize APIs**:
   - Scroll down to **Gmail API v1**.
   - Expand it and check:
     ```
     https://www.googleapis.com/auth/gmail.send
     ```
4. Click the blue **Authorize APIs** button at the bottom of the left column.
5. Google will open a sign-in popup:
   - Select your Gmail account.
   - If Google shows a screen saying *"Google hasn’t verified this app"*, click **Advanced** (at the bottom) > click **Go to Limu Kosa CMS (unsafe)**.
   - Click **Continue** to grant permission to send emails.
6. OAuth Playground will automatically jump to **Step 2: Exchange authorization code for tokens**:
   - Click the blue button: **Exchange authorization code for tokens**.
7. Look at the response fields on the right side:
   - Find the field labeled **Refresh token**.
   - Copy this value (it usually starts with `1//...`).

> [!TIP]
> Do not copy the *Access token* (which expires in 1 hour). Always copy the **Refresh token**, as our backend uses it to generate fresh access tokens automatically.

---

### Step 5: Add the Environment Variables to Render

1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. Click on your backend service: **limu-kosa-api**.
3. On the left menu, click **Environment**.
4. Remove any existing `SMTP_HOST`, `SMTP_PORT`, or `RESEND_API_KEY` variables if you want all emails to route through Gmail API.
5. Click **Add Environment Variable** and add the following 4 keys:

| Key | Value |
| :--- | :--- |
| `GMAIL_CLIENT_ID` | *Your Client ID from Step 3* |
| `GMAIL_CLIENT_SECRET` | *Your Client Secret from Step 3* |
| `GMAIL_REFRESH_TOKEN` | *Your Refresh Token from Step 4* |
| `GMAIL_USER` | `your-email@gmail.com` *(Must match the Gmail account used in Step 4)* |

6. Ensure `FRONTEND_URL` is set to:
   ```env
   FRONTEND_URL=https://limu-kosa.vercel.app
   ```
7. Click **Save Changes**.

Render will automatically trigger a new deployment with the updated credentials.

---

## 🧪 Testing the Integration

1. Open your live frontend: [https://limu-kosa.vercel.app/admin](https://limu-kosa.vercel.app/admin).
2. Click **Forgot Password?**.
3. Enter any registered user's email address (e.g. `superadmin@limukosa.gov.et` or your own email).
4. Click **Send Password Reset Link**.
5. Check the recipient's inbox:
   - You will receive an official email titled **"Reset your Limu Kosa Admin Password"**.
   - The email includes a **Reset Password** button valid for 1 hour.
6. Click the button to enter a new password and log in!

---

## 🛠️ Troubleshooting & FAQ

### 1. Error: `invalid_grant` or token expired
- **Cause**: The refresh token was revoked or expired. This can happen if the Google Cloud project was in "Testing" mode and 7 days passed.
- **Fix**: In Google Cloud Console under **OAuth consent screen**, you can set the Publishing status to **In Production** (click "Publish App"), or simply re-generate a new refresh token using Step 4 above.

### 2. Can I send emails from a custom email like `admin@limukosa.gov.et`?
- **Yes**: In your Gmail account settings ([mail.google.com](https://mail.google.com)), go to **Settings (Gear)** > **See all settings** > **Accounts and Import** > **Send mail as**.
- Add `admin@limukosa.gov.et` as a verified alias. Once verified in Gmail, the API can send using that alias as the `From` header.

### 3. What is the daily sending limit?
- Free Gmail accounts (`@gmail.com`) have a limit of **500 emails per 24-hour period**.
- Google Workspace accounts have a limit of **2,000 emails per 24-hour period**.
- For an administrative portal sending password resets, 500 emails/day is more than sufficient.
