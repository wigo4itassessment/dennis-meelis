import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

import { LabYak } from '@dennis-meelis/api-interfaces';

const parseXmlYak = ({
  $: { name, age, sex },
}: {
  $: Record<string, string>;
}): LabYak => {
  if (!name) {
    throw new InternalServerErrorException(`LabYak name is required`);
  }

  if (isNaN(+age)) {
    throw new InternalServerErrorException(
      `LabYak ${name}: age '${age}' is not a number`
    );
  }
  if (sex !== 'f' && sex !== 'm') {
    throw new InternalServerErrorException(
      `LabYak ${name}: sex must be either 'f' or 'm', found '${sex}'`
    );
  }
  return { name, age: +age, sex };
};

@Controller('load')
export class LoadController {
  @Post()
  @HttpCode(204)
  loadHerd(
    @Body() body: { herd: { labyak: { $: Record<string, string> }[] } }
  ) {
    if (!body?.herd?.labyak?.length) {
      throw new InternalServerErrorException(`No labyaks found`);
    }

    const labYaks = body.herd.labyak.map(parseXmlYak);
    console.log('labYaks', JSON.stringify(labYaks, null, 2));
  }
}
