// One icon set (Tabler, the set Starwind uses) for the whole site, as raw SVG strings
// so both Astro components and Svelte islands can render them.
import alert from '@tabler/icons/outline/alert-triangle.svg?raw';
import arrowLeft from '@tabler/icons/outline/arrow-left.svg?raw';
import arrowRight from '@tabler/icons/outline/arrow-right.svg?raw';
import bolt from '@tabler/icons/outline/bolt.svg?raw';
import brain from '@tabler/icons/outline/brain.svg?raw';
import bulb from '@tabler/icons/outline/bulb.svg?raw';
import calculator from '@tabler/icons/outline/calculator.svg?raw';
import check from '@tabler/icons/outline/check.svg?raw';
import circleCheck from '@tabler/icons/outline/circle-check.svg?raw';
import circleDashed from '@tabler/icons/outline/circle-dashed.svg?raw';
import clock from '@tabler/icons/outline/clock.svg?raw';
import chartPie from '@tabler/icons/outline/chart-pie.svg?raw';
import chevronDown from '@tabler/icons/outline/chevron-down.svg?raw';
import cpu from '@tabler/icons/outline/cpu.svg?raw';
import crown from '@tabler/icons/outline/crown.svg?raw';
import database from '@tabler/icons/outline/database.svg?raw';
import eye from '@tabler/icons/outline/eye.svg?raw';
import eyeOff from '@tabler/icons/outline/eye-off.svg?raw';
import flag from '@tabler/icons/outline/flag.svg?raw';
import flame from '@tabler/icons/outline/flame.svg?raw';
import gamepad from '@tabler/icons/outline/device-gamepad-2.svg?raw';
import grid from '@tabler/icons/outline/layout-grid.svg?raw';
import handClick from '@tabler/icons/outline/hand-click.svg?raw';
import history from '@tabler/icons/outline/history.svg?raw';
import key from '@tabler/icons/outline/key.svg?raw';
import minus from '@tabler/icons/outline/minus.svg?raw';
import network from '@tabler/icons/outline/network.svg?raw';
import refresh from '@tabler/icons/outline/refresh.svg?raw';
import pencil from '@tabler/icons/outline/pencil.svg?raw';
import stack from '@tabler/icons/outline/stack-2.svg?raw';
import target from '@tabler/icons/outline/target.svg?raw';
import x from '@tabler/icons/outline/x.svg?raw';

export const icons = {
  alert,
  arrowLeft,
  arrowRight,
  bolt,
  brain,
  bulb,
  calculator,
  chartPie,
  check,
  chevronDown,
  circleCheck,
  circleDashed,
  clock,
  cpu,
  crown,
  database,
  eye,
  eyeOff,
  flag,
  flame,
  gamepad,
  grid,
  handClick,
  history,
  key,
  minus,
  network,
  pencil,
  refresh,
  stack,
  target,
  x,
};

export type IconName = keyof typeof icons;
