import { Browser, Page, chromium } from '@playwright/test';

/**
 * Ability: BrowseTheWeb
 * Represents the ability of an actor to browse the web using a browser
 */
export class BrowseTheWeb {
  private static browser: Browser;
  private page: Page;

  private constructor(page: Page) {
    this.page = page;
  }

  /**
   * Initialize the browser and return a new BrowseTheWeb ability
   */
  static async using(): Promise<BrowseTheWeb> {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: process.env.CI === 'true',
      });
    }
    const context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: process.env.CI ? { dir: './test-results/videos' } : undefined,
    });
    const page = await context.newPage();
    return new BrowseTheWeb(page);
  }

  /**
   * Get the current page
   */
  getPage(): Page {
    return this.page;
  }

  /**
   * Close the current page and context
   */
  async closePage(): Promise<void> {
    await this.page.context().close();
  }

  /**
   * Close the browser
   */
  static async closeAll(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null as any;
    }
  }
}
