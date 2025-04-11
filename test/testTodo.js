const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

describe("To-Do List - Pruebas Automatizadas", function () {
  let driver;
  this.timeout(40000);

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => {
    await driver.quit();
  });

  it("Debe agregar una tarea y verificar que aparece en la tabla", async () => {
    await driver.get("http://localhost:5173");

    const testTitle = "Tarea desde Selenium";
    const inputs = await driver.findElements(By.css('input[type="text"]'));
    const taskInput = inputs[1];

    await taskInput.clear();
    await taskInput.sendKeys(testTitle);

    const addButton = await driver.findElement(By.id("button"));
    await addButton.click();

    await driver.sleep(3000);

    const bodyText = await driver.findElement(By.tagName("body")).getText();
    assert.ok(bodyText.includes(testTitle), "La tarea no apareció en la tabla");

    await takeScreenshot(driver, "tarea-creada");
  });

  it("Debe marcar una tarea como completada", async () => {
    await driver.get("http://localhost:5173");

    const testTitle = "Tarea para completar";
    const inputs = await driver.findElements(By.css('input[type="text"]'));
    const taskInput = inputs[1];

    await taskInput.clear();
    await taskInput.sendKeys(testTitle);

    const addButton = await driver.findElement(By.id("button"));
    await addButton.click();

    await driver.sleep(3000);

    const row = await driver.wait(
      until.elementLocated(
        By.xpath(`//tr[td[contains(text(), '${testTitle}')]]`)
      ),
      8000
    );
    const checkbox = await row.findElement(By.css('input[type="checkbox"]'));
    await checkbox.click();

    await driver.sleep(1000);
    await takeScreenshot(driver, "tarea-completada");
  });

  it("Debe eliminar una tarea", async () => {
    await driver.get("http://localhost:5173");

    const testTitle = "Tarea a eliminar";
    const inputs = await driver.findElements(By.css('input[type="text"]'));
    const taskInput = inputs[1];

    await taskInput.clear();
    await taskInput.sendKeys(testTitle);

    const addButton = await driver.findElement(By.id("button"));
    await addButton.click();

    await driver.sleep(3000);

    const row = await driver.wait(
      until.elementLocated(
        By.xpath(`//tr[td[contains(text(), '${testTitle}')]]`)
      ),
      8000
    );
    const buttons = await row.findElements(By.css("button"));
    await buttons[1].click();

    await driver.sleep(1500);

    const bodyText = await driver.findElement(By.tagName("body")).getText();
    assert.ok(!bodyText.includes(testTitle), "La tarea no fue eliminada");

    await takeScreenshot(driver, "tarea-eliminada");
  });

  it("Debe buscar una tarea por palabra clave", async () => {
    await driver.get("http://localhost:5173");

    const testTitle = "Buscar esta Tarea";
    const inputs = await driver.findElements(By.css('input[type="text"]'));
    const taskInput = inputs[1];
    const searchInput = inputs[0];

    await taskInput.clear();
    await taskInput.sendKeys(testTitle);

    const addButton = await driver.findElement(By.id("button"));
    await addButton.click();

    await driver.sleep(3000);

    await searchInput.clear();
    await searchInput.sendKeys("Buscar esta TAREA");

    await driver.sleep(1500);

    const bodyText = await driver.findElement(By.tagName("body")).getText();
    assert.ok(
      bodyText.includes(testTitle),
      "No se encontró la tarea por búsqueda"
    );

    await takeScreenshot(driver, "buscar-tarea");
  });
});

async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  const filePath = path.resolve(__dirname, `../screenshot_mocha/${name}.png`);
  fs.writeFileSync(filePath, screenshot, "base64");
}
