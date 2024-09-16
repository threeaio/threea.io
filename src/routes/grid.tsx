import { AnimatedTiles } from "~/components/layouts/Animated-Tiles";
import { BleedRight } from "~/components/layouts/bleed-right/Bleed-Right";
import { BleedRightHalf } from "~/components/layouts/bleed-right/Bleed-Right-Half";
import { BleedLeft } from "~/components/layouts/bleed-left/Bleed-Left";
import { BleedLeftHalf } from "~/components/layouts/bleed-left/Bleed-Left-Half";
import { FullWidth } from "~/components/layouts/Full-Width";
import { GridIndicator } from "~/components/Grid-Indicator";
import { GridTester } from "~/components/layouts/Grid-Tester";
import { BleedRightSmall } from "~/components/layouts/bleed-right/Bleed-Right-Small";
import { BleedLeftSmall } from "~/components/layouts/bleed-left/Bleed-Left-Small";

export default function Home() {
  return (
    <div>
      <GridIndicator />
      <FullWidth>
        <h2 class="my-4">Full Width</h2>
      </FullWidth>
      <FullWidth>
        <GridTester />
      </FullWidth>
      <GridIndicator />
      <FullWidth>
        <h2 class="my-4">Bleed Right</h2>
      </FullWidth>
      <BleedRight Left={<GridTester />} Right={<GridTester />} />
      <BleedRightHalf Left={<GridTester />} Right={<GridTester />} />
      <BleedRightSmall Left={<GridTester />} Right={<GridTester />} />

      <GridIndicator />
      <FullWidth>
        <h2 class="my-4">Bleed Left</h2>
      </FullWidth>
      <BleedLeft Left={<GridTester />} Right={<GridTester />} />
      <BleedLeftHalf Left={<GridTester />} Right={<GridTester />} />
      <BleedLeftSmall Left={<GridTester />} Right={<GridTester />} />
      <GridIndicator />
      <FullWidth>
        <h2 class="my-4">Animated Tiles</h2>
      </FullWidth>
      <AnimatedTiles
        Header={<GridTester />}
        Tile1={<GridTester />}
        Tile2={<GridTester />}
      />
      <AnimatedTiles
        Tile1={<GridTester />}
        Tile2={<GridTester />}
        Tile3={<GridTester />}
      />
      <AnimatedTiles
        Tile1={<GridTester />}
        Tile2={<GridTester />}
        Tile3={<GridTester />}
      />
      {/*<AnimatedTiles Tile1={<GridTester />} Tile2={<GridTester />} Tile3={<GridTester />} />*/}
      {/*<Grid>*/}
      {/*  <ColHalfLeft><GridIndicator /></ColHalfLeft>*/}
      {/*  <ColHalfRight><GridIndicator /></ColHalfRight>*/}
      {/*</Grid>*/}
      {/*<Grid>*/}
      {/*  <ColHalfLeft_Bleed><GridIndicator /></ColHalfLeft_Bleed>*/}
      {/*  <ColHalfRight><GridIndicator /></ColHalfRight>*/}
      {/*</Grid>*/}
    </div>
  );
}
