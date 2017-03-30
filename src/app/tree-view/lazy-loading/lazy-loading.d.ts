import { TreeNode } from "clarity-angular/tree-view/tree-node";
import "clarity-icons/shapes/basic-shapes";
import "clarity-icons/shapes/technology-shapes";
import "clarity-icons/shapes/social-shapes";
export declare class TreeNodeLazyLoadingDemo {
    exampleHTML: string;
    exampleTS: string;
    dirName: string;
    dirShape: string;
    files: any[];
    loading: boolean;
    lazyTreeNode: TreeNode;
    fetchFiles(): void;
    onReset(): void;
}
