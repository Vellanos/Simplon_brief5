// Déclaration des modules pour éviter des erreurs lors de l'import des images dans le TypeScript

declare module "*.jpg" {
    const content : string;
    export default content;
} 

declare module "*.gif" {
    const content : string;
    export default content;
} 

declare module "*.png" {
    const content : string;
    export default content;
}

