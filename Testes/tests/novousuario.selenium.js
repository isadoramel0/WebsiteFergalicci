import { Builder, By, until } from "selenium-webdriver";
import { assert } from "chai";

async function novoUsuario() {
  // Abrir o navegador
  const driver = await new Builder().forBrowser("chrome").build();

  // Acessar a página de novo usuário
  await driver.get("http://localhost:5173/");

  // Acessa a página de cadastro
  await driver.findElement(By.partialLinkText("Faça seu")).click();

  // Preenche o formulário de cadastro
  await driver.findElement(By.name("nome")).sendKeys("Fulano da Silva");
  await driver.findElement(By.name("email")).sendKeys("fulano@email.com");
  await driver.findElement(By.name("password")).sendKeys("umaSenhaSimples0");
  await driver
    .findElement(By.name("confirmPassword"))
    .sendKeys("umaSenhaSimples0");
  await driver.findElement(By.xpath(`//*[@id="root"]/div/form/button`)).click();
  await driver.wait(until.elementLocated(By.xpath(`//*[@id="root"]/div/form/button`)), 5000);

  // Verifica se o usuário foi redirecionado para a página de login
  try {
    const currentUrl = await driver.getCurrentUrl();
    await assert.strictEqual(currentUrl, "http://localhost:5173/login");
    console.log("Usuário cadastrado com sucesso!");
  } catch (error) {
    console.error(error);
  }

  // Fecha o navegador
  await driver.quit();
}

novoUsuario();
