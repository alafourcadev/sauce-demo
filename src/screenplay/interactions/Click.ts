import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Interaction: Click
 * Click on an element identified by a selector
 */
export class Click {
  private constructor(private selector: string) {}

  static on(selector: string): Click {
    return new Click(selector);
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.getAbility<BrowseTheWeb>(BrowseTheWeb);
    const page = browseTheWeb.getPage();
    await page.locator(this.selector).click();
  }
}
