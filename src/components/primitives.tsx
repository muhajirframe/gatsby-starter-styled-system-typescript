import { Box as BoxRebass, Flex } from 'rebass';
import styled from 'styled-components';
import { color } from '../theme';
interface IBox {
  color?: color;
  bg?: color;
}
const Box = styled(BoxRebass)<IBox>``;

/**
 * Export
 */
export { Flex, Box };
