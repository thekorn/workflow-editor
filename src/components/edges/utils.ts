import type { Node, Side, Vec } from '@/types';
import { addVec } from '../../utils';

export function getPortPosition(node: Node, side: Side): Vec {
  switch (side) {
    case 'left':
      return addVec(node, { x: 0, y: node.height / 2 });
    case 'right':
      return addVec(node, { x: node.width, y: node.height / 2 });
    case 'top':
      return addVec(node, { x: node.width / 2, y: 0 });
    case 'bottom':
      return addVec(node, { x: node.width / 2, y: node.height });
  }
}
