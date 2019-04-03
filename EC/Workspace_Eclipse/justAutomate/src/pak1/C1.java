package pak1;

import java.io.File;
import java.io.IOException;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

public class C1 {
	public WebDriver driver;
	
	@Test (priority = 1)
	public void basic(){
		System.setProperty("webdriver.gecko.driver","/home/sushma/Downloads/geckodriver-v0.24.0-linux64/geckodriver");
		driver = new FirefoxDriver();		
	}

	
	@Test (priority = 4, dataProvider = "testdata", dependsOnMethods = "basic")
	public void SignIn(String uname, String pwd) throws InterruptedException{
		System.out.println(uname + "pwd = "+ pwd);
		driver.get("https://www.google.com/");
		driver.findElement(By.partialLinkText("Sign")).click();	
		driver.findElement(By.xpath("//input[@id='identifierId']")).sendKeys(uname);
		driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/content/span")).click();

	    
		String Idurl = driver.getCurrentUrl();
		if (!(Idurl.contains("https://accounts.google.com/signin/v2/identifier?"))){	
		WebDriverWait wait = new WebDriverWait(driver, 120);
	    wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div[1]/div[1]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/form/content/section/div/content/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input")));
	    
		driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/form/content/section/div/content/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input")).sendKeys(pwd);		
		driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/content/span")).click();
			
			String PwUrl = driver.getCurrentUrl();
			Assert.assertEquals(PwUrl,"https://www.google.com/");
		}		
		
	}
	
	@DataProvider (name = "testdata")
	public Object[][] readExcel() throws BiffException, IOException{
		
		File f = new File("/home/sushma/Desktop/just.xls");
		Workbook w = Workbook.getWorkbook(f);
		Sheet s = w.getSheet("Sheet1");
		int rows = s.getRows();
		int columns = s.getColumns();
		System.out.println(rows);
		System.out.println(columns);
		String inputData [] [] = new String [rows] [columns];
		for ( int i = 0; i<rows; i++){
			for ( int j = 0; j < columns; j++){
				Cell c = s.getCell(j,i); //Takes columns, rows as arguments to retrieve a cell
				inputData[i][j] = c.getContents();
				
			}
		}
		return inputData;
			
	}
	
	@Test (priority = 6)
	public void Youtube() throws InterruptedException{
		WebDriverWait wait = new WebDriverWait(driver, 120);
	    wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div/div[3]/div[1]/div/div/div/div[2]/div[1]/div[1]/a")));
		driver.findElement(By.xpath("/html/body/div/div[3]/div[1]/div/div/div/div[2]/div[1]/div[1]/a")).click();
		driver.findElement(By.xpath("/html/body/div/div[3]/div[1]/div/div/div/div[2]/div[1]/div[2]/ul[1]/li[4]/a/span[1]")).click();
		
//		driver.switchTo().alert().dismiss();
//		Alert alert = driver.switchTo().alert();
//		Thread.sleep(10000);
//		String alertmsg = alert.getText();
//		Thread.sleep(3000);
//		System.out.println(alertmsg);
//		
//	    wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='search']")));
//	    
//	    
//		driver.findElement(By.xpath("//*[@id='search']")).sendKeys("Jagga jiteya 8D Audio");
//		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("search-icon-legacy")));
//		driver.findElement(By.id("search-icon-legacy")).click();
//		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='video-titl']")));
//		driver.findElement(By.xpath("//*[@id='video-titl']")).click();
		
	}
	
	
	

}
