import { Builder, By, until } from "selenium-webdriver";
import { assert } from "chai";
import path from "path";

async function cadastrarProduto() {
  // Abrir o navegador
  const driver = await new Builder().forBrowser("chrome").build();

  // Acessar a página de login
  await driver.get("http://localhost:5173");

  // Acessa a página de login
  await driver.findElement(By.partialLinkText("Fazer Login")).click();

  // Preenche o formulário de login
  await driver.findElement(By.name("email")).sendKeys("ma@dominio.com");
  await driver.findElement(By.name("password")).sendKeys("senhaBoa0");
  await driver.findElement(By.xpath(`//*[@id="root"]/div/form/button`)).click();

  // Clica na opção produtos
  await driver.wait(
    until.elementLocated(By.xpath(`//*[@id="root"]/div/div/div/a[2]`)),
    5000
  );
  await driver
    .findElement(By.xpath(`//*[@id="root"]/div/div/div/a[2]`))
    .click();

  // Clica em adicionar
  await driver.wait(
    until.elementLocated(
      By.xpath(`//*[@id="root"]/div/div[2]/div/div/div[1]/a`)
    ),
    5000
  );
  await driver
    .findElement(By.xpath(`//*[@id="root"]/div/div[2]/div/div/div[1]/a`))
    .click();

  // Preenche o formulário de cadastro de produto
  await driver.wait(until.elementLocated(By.id(`nome`)), 5000);
  await driver.findElement(By.id(`nome`)).sendKeys("Produto Teste");
  const image = path.resolve(`../Web/public/imgs/textura_pelos.png`);
  await driver.findElement(By.name("foto_produto")).sendKeys(image);
  await driver
    .findElement(By.xpath(`//*[@id="root"]/div/div[2]/form/div[2]/button`))
    .click();

  // Verifica se o produto foi cadastrado
  await driver.wait(
    until.elementLocated(
      By.xpath(`//*[@id="root"]/div/div[3]/button`)
    ),
    5000
  );
  const textoOK = await driver
  .findElement(By.xpath(`//*[@id="root"]/div/div[3]/button`))
  .getText();

  try{
    assert.strictEqual(textoOK, "OK");
    console.log("Produto cadastrado com sucesso!");
  } catch (error) {
    console.log("Erro ao cadastrar produto", error);
  }

  // Fecha o navegador
  await driver.quit();
}

cadastrarProduto();
