export interface Dimensions {
    width: number;
    height: number;
  }
  
  export interface Styles {
    [key: string]: any;
  }
  
  export interface CodigmaModel {
    name: string;
    type: string;
    dimensions: Dimensions;
    styles: Styles;
    content?: string;
    children: CodigmaModel[];
  }
  