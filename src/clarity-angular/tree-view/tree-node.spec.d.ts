import { TreeNode } from "./tree-node";
import { TreeView } from "./tree-view";
export default function (): void;
export declare class ParentChildTreeNodeSelectionTestComponent {
    treeSelection: any[];
    tree: TreeView;
    a1Node: TreeNode;
    b1Node: TreeNode;
    c1Node: TreeNode;
    c2Node: TreeNode;
    c3Node: TreeNode;
    b2Node: TreeNode;
    a1NodeChangeValue: boolean;
    b1NodeChangeValue: boolean;
    c1NodeChangeValue: boolean;
    a1NodeChanged(val: boolean): void;
    b1NodeChanged(val: boolean): void;
    c1NodeChanged(val: boolean): void;
}
export declare class BasicTreeNodeSelectionTestComponent {
    treeSelection: any[];
    tree: TreeView;
    a1Node: TreeNode;
    a2Node: TreeNode;
    a1NodeSelection: boolean;
    a2NodeSelection: boolean;
    a1NodeSelectionChangeValue: boolean;
    a2NodeSelectionChangeValue: boolean;
    a1NodeSelectionChange(value: boolean): void;
    a2NodeSelectionChange(value: boolean): void;
}
export declare class BasicTreeNodeTestComponent {
    parentTreeNode: TreeNode;
    childTreeNode: TreeNode;
}
export declare class DynamicTreeNodeTestComponent {
    nodes: any;
}
export declare class TreeNodeExpandTestComponent {
    parentTreeNode: TreeNode;
    expanded: boolean;
    outputExpanded: boolean;
    onExpandedChange(value: boolean): void;
}
export declare class TreeNodeExpandableTestComponent {
    parentTreeNode: TreeNode;
    expandable: boolean;
    loading: boolean;
}
export declare class TreeNodeSelectTestComponent {
    treeSelection: any[];
    parent: boolean;
    child: boolean;
}
