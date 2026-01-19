import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { CallAnAPI } from '../abilities/CallAnAPI';

/**
 * Actor: Represents a user or system that performs actions
 * Following the Screenplay Pattern
 */
export class Actor {
  private name: string;
  private abilities: Map<string, any> = new Map();

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Get the actor's name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Grant the actor the ability to browse the web
   */
  async whoCan(ability: any): Promise<Actor> {
    const abilityName = ability.constructor.name;
    this.abilities.set(abilityName, ability);
    return this;
  }

  /**
   * Get a specific ability by class reference
   */
  getAbility<T>(abilityClass: { name: string }): T {
    const abilityName =
      typeof abilityClass === 'string' ? abilityClass : abilityClass.name;
    const ability = this.abilities.get(abilityName);
    if (!ability) {
      throw new Error(`${this.name} does not have the ability: ${abilityName}`);
    }
    return ability;
  }

  /**
   * Perform a task
   */
  async attemptsTo(...tasks: any[]): Promise<void> {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }

  /**
   * Ask a question
   */
  async asks<T>(question: any): Promise<T> {
    return await question.answeredBy(this);
  }

  /**
   * Clean up all abilities
   */
  async cleanup(): Promise<void> {
    const browseAbility = this.abilities.get('BrowseTheWeb');
    if (browseAbility) {
      await browseAbility.closePage();
    }

    const apiAbility = this.abilities.get('CallAnAPI');
    if (apiAbility) {
      await apiAbility.dispose();
    }
  }

  /**
   * Factory method to create an actor with a name
   */
  static named(name: string): Actor {
    return new Actor(name);
  }
}
