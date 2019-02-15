import { Box as BoxRebass, BoxProps, Flex } from 'rebass';
import styled from 'styled-components';
import { color } from '../theme';

interface IBox extends BoxProps {
  color: color;
  bg: color;
}
const Box = styled(BoxRebass)<IBox>``;

/**
 * Export
 */
export { Flex, Box };
