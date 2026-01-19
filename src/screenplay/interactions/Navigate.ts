import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Interaction: Navigate
 * Navigate to a specific URL
 */
export class Navigate {
  private constructor(private url: string) {}

  static to(url: string): Navigate {
    return new Navigate(url);
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.getAbility<BrowseTheWeb>(BrowseTheWeb);
    const page = browseTheWeb.getPage();
    await page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }
}
