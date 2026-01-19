import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Question: Text
 * Get the text content of an element
 */
export class Text {
  private constructor(private selector: string) {}

  static of(selector: string): Text {
    return new Text(selector);
  }

  async answeredBy(actor: Actor): Promise<string> {
    const browseTheWeb = actor.getAbility<BrowseTheWeb>(BrowseTheWeb);
    const page = browseTheWeb.getPage();
    return await page.locator(this.selector).textContent() || '';
  }
}

/**
 * Question: IsVisible
 * Check if an element is visible
 */
export class IsVisible {
  private constructor(private selector: string) {}

  static of(selector: string): IsVisible {
    return new IsVisible(selector);
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    const browseTheWeb = actor.getAbility<BrowseTheWeb>(BrowseTheWeb);
    const page = browseTheWeb.getPage();
    return await page.locator(this.selector).isVisible();
  }
}
