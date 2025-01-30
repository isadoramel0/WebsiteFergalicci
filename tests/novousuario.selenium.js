import { Builder, By } from "selenium-webdriver";

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
  await driver.findElement(By.name("confirmPassword")).sendKeys("umaSenhaSimples0");
  await driver.findElement(By.xpath(`//*[@id="root"]/div/form/button`)).click();

  // Fecha o navegador
  await driver.quit();
};

novoUsuario();