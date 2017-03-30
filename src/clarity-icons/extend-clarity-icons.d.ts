import { IconTemplate } from "./interfaces/icon-template";
import { IconAlias } from "./interfaces/icon-alias";
export declare class UserIcons {
    private validateName(name);
    private validateTemplate(template);
    getExtendedShapes(): IconTemplate;
    private setIconTemplate(shapeName, shapeTemplate);
    add(icons: IconTemplate): void;
    private setIconAliases(templates, shapeName, aliasNames);
    alias(aliases: IconAlias): void;
}
