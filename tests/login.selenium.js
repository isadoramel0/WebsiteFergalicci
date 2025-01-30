import { Builder, By, until } from "selenium-webdriver";
import { assert } from "chai";

async function login() {
  // Abrir o navegador
  const driver = await new Builder().forBrowser("chrome").build();

  // Acessar a página de login
  await driver.get("http://localhost:5173");

  // Acessa a página de login
  await driver.findElement(By.partialLinkText("Fazer Login")).click();

  // Preenche o formulário de cadastro
  await driver.findElement(By.name("email")).sendKeys("fulano@email.com");
  await driver.findElement(By.name("password")).sendKeys("umaSenhaSimples0");
  await driver.findElement(By.xpath(`//*[@id="root"]/div/form/button`)).click();
  await driver.wait(until.elementLocated(By.xpath(`//*[@id="root"]/div/nav[1]/p`)), 5000);

  const textoElemento = await driver
    .findElement(By.xpath(`//*[@id="root"]/div/nav[1]/p`))
    .getText();
  await assert.strictEqual(textoElemento, "BLOG");

  // Fecha o navegador
  //await driver.quit();
}

login();
