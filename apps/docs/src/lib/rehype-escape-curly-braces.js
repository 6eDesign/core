import { visit } from 'unist-util-visit';

export default function rehypeEscapeCurlyBraces() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      node.value = node.value.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
    });
  };
}
