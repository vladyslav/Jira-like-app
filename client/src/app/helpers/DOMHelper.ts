export default class DOMHelper {
  public static getParentElement(element: HTMLElement,searchedClass:string) {
    let column = element;

    while (!column.classList.contains(searchedClass)) {

      column = column.parentElement!;
      if (!column) return undefined;
    }
    return column;
  }
}
