const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("🟡 Abriendo página de login...");
  await page.goto("https://app-padelbreak.matchpoint.com.es/Login.aspx");

  console.log("🟡 Completando formulario...");
  await page.fill('input[name="username"]', "Matias");
  await page.fill('input[name="password"]', "tarekiva3613");

  console.log("🟡 Haciendo click en el botón...");
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[name="btnLogin"]')
  ]);

  const currentUrl = page.url();
  console.log("✅ Redirigido a:", currentUrl);

  const title = await page.title();
  console.log("✅ Título de la página:", title);

  const cookies = await context.cookies();
  console.log("🍪 Cookies actuales:", cookies);

  await browser.close();
})();
