import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Interaction: Fill
 * Fill a form field with a value
 */
export class Fill {
  private constructor(
    private selector: string,
    private value: string
  ) {}

  static field(selector: string): { with: (value: string) => Fill } {
    return {
      with: (value: string) => new Fill(selector, value),
    };
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.getAbility<BrowseTheWeb>(BrowseTheWeb);
    const page = browseTheWeb.getPage();
    await page.locator(this.selector).fill(this.value);
  }
}
