import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import {
  // ARRAY_VALIDATOR_MESSAGE_REGEX,
  BIGINT_VALIDATOR_MESSAGE_REGEX,
  BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  CUSTOM_VALIDATOR_MESSAGE_REGEX,
  DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  ExtendedDMMFFieldValidatorMap,
  NUMBER_VALIDATOR_MESSAGE_REGEX,
  NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  STRING_VALIDATOR_DATETIME_REGEX,
  STRING_VALIDATOR_MESSAGE_REGEX,
  STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
} from '../../07_extendedDMMFFieldValidatorMap';
import { globalConfig } from '../../../../config';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorMap<
  T extends ExtendedDMMFFieldValidatorMap,
>(classConstructor: new (model: DMMF.Field, modelName: string) => T) {
  const getField = (field?: Partial<DMMF.Field>) =>
    new classConstructor({ ...FIELD_BASE, ...field }, 'ModelName');

  /////////////////////////////////////////////
  // REGEX TESTS
  /////////////////////////////////////////////

  if (!globalConfig.isInitialized()) {
    globalConfig.initializeWithConfig(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  describe("ExtendedDMMFFieldValidatorMap's regex with japanese chars", () => {
    it(`string validator number should return match for regex with japanese chars`, async () => {
      const result = STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX.exec(
        ".min(5, {message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(result?.groups?.validator).toBe('min');
      expect(result?.groups?.number).toBe('5');
      expect(result?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );
    });

    it(`string validator message should return match for regex with japanese chars`, async () => {
      const result = STRING_VALIDATOR_MESSAGE_REGEX.exec(
        ".email({message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(result?.groups?.validator).toBe('email');
      expect(result?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );
    });

    it(`string validator string should return match for regex with japanese chars`, async () => {
      const result = STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX.exec(
        ".startsWith('ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', {message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(result?.groups?.validator).toBe('startsWith');
      expect(result?.groups?.string).toBe(
        "'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'",
      );
      expect(result?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );
    });

    it(`string validator datetime should return match for regex with japanese chars`, async () => {
      const result = STRING_VALIDATOR_DATETIME_REGEX.exec(
        ".datetime({ message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', offset: true, local: true, precision: 2 })",
      );
      expect(result?.groups?.validator).toBe('datetime');
      expect(result?.groups?.message).toBe(
        "{ message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'",
      );
    });

    it(`number validator number should return match for regex with japanese chars`, async () => {
      const result = NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX.exec(
        ".min(2, {message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(result?.groups?.validator).toBe('min');
      expect(result?.groups?.number).toBe('2');
      expect(result?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );
    });

    it(`number validator message should return match for regex with japanese chars`, async () => {
      const result = NUMBER_VALIDATOR_MESSAGE_REGEX.exec(
        ".int({message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(result?.groups?.validator).toBe('int');
      expect(result?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );
    });

    it(`date validator number should return match for regex with japanese chars`, async () => {
      const result = DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX.exec(
        ".min(new Date(01-01-2022), { message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' })",
      );
      expect(result?.groups?.validator).toBe('min');
      expect(result?.groups?.date).toBe('new Date(01-01-2022)');
      expect(result?.groups?.message).toBe(
        "{ message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' }",
      );
    });

    it(`bigint validator number should return match for regex with japanese chars`, async () => {
      const result = BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX.exec(
        ".gt(2n, { message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' })",
      );
      expect(result?.groups?.validator).toBe('gt');
      expect(result?.groups?.number).toBe('2n');
      expect(result?.groups?.message).toBe(
        "{ message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' }",
      );
    });

    it(`bigint validator message should return match for regex with japanese chars`, async () => {
      const result = BIGINT_VALIDATOR_MESSAGE_REGEX.exec(
        ".positive({message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(result?.groups?.validator).toBe('positive');
      expect(result?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );
    });

    it(`custom validator message should return match for regex with japanese chars`, async () => {
      const result = CUSTOM_VALIDATOR_MESSAGE_REGEX.exec(
        ".use(z.string.min(2, { message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' }))",
      );

      expect(result?.groups?.validator).toBe('use');
      expect(result?.groups?.pattern).toBe(
        "z.string.min(2, { message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' })",
      );
    });

    it(`custom validator message should return match for regex with nested objects`, async () => {
      const result = CUSTOM_VALIDATOR_MESSAGE_REGEX.exec(
        '.use(z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))}))',
      );

      expect(result?.groups?.validator).toBe('use');
      expect(result?.groups?.pattern).toBe(
        'z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))})',
      );
    });

    it(`array validator message should return match for regex with japanese chars`, async () => {
      const result = CUSTOM_VALIDATOR_MESSAGE_REGEX.exec(
        ".array(min(2, { message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' }))",
      );

      expect(result?.groups?.validator).toBe('array');
      expect(result?.groups?.pattern).toBe(
        "min(2, { message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' })",
      );
    });
  });

  describe("ExtendedDMMFFieldValidatorMap's regex with latin chars ", () => {
    it(`string validator number should return match for regex with japanese chars`, async () => {
      const result = STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX.exec(
        ".min(5, {message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'})",
      );
      expect(result?.groups?.validator).toBe('min');
      expect(result?.groups?.number).toBe('5');
      expect(result?.groups?.message).toBe(
        "{message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'}",
      );
    });

    it(`string validator message should return match for regex with japanese chars`, async () => {
      const result = STRING_VALIDATOR_MESSAGE_REGEX.exec(
        ".email({message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'})",
      );
      expect(result?.groups?.validator).toBe('email');
      expect(result?.groups?.message).toBe(
        "{message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'}",
      );
    });

    it(`string validator string should return match for regex with japanese chars`, async () => {
      const result = STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX.exec(
        ".startsWith('ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs', {message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'})",
      );
      expect(result?.groups?.validator).toBe('startsWith');
      expect(result?.groups?.string).toBe(
        "'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'",
      );
      expect(result?.groups?.message).toBe(
        "{message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'}",
      );
    });

    it(`number validator number should return match for regex with japanese chars`, async () => {
      const result = NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX.exec(
        ".min(2, {message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'})",
      );
      expect(result?.groups?.validator).toBe('min');
      expect(result?.groups?.number).toBe('2');
      expect(result?.groups?.message).toBe(
        "{message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'}",
      );
    });

    it(`number validator message should return match for regex with japanese chars`, async () => {
      const result = NUMBER_VALIDATOR_MESSAGE_REGEX.exec(
        ".int({message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'})",
      );
      expect(result?.groups?.validator).toBe('int');
      expect(result?.groups?.message).toBe(
        "{message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'}",
      );
    });

    it(`date validator number should return match for regex with japanese chars`, async () => {
      const result = DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX.exec(
        ".min(new Date(01-01-2022), { message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs' })",
      );
      expect(result?.groups?.validator).toBe('min');
      expect(result?.groups?.date).toBe('new Date(01-01-2022)');
      expect(result?.groups?.message).toBe(
        "{ message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs' }",
      );
    });

    it(`bigint validator number should return match for regex with japanese chars`, async () => {
      const result = BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX.exec(
        ".gt(2n, { message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs' })",
      );
      expect(result?.groups?.validator).toBe('gt');
      expect(result?.groups?.number).toBe('2n');
      expect(result?.groups?.message).toBe(
        "{ message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs' }",
      );
    });

    it(`bigint validator message should return match for regex with japanese chars`, async () => {
      const result = BIGINT_VALIDATOR_MESSAGE_REGEX.exec(
        ".positive({message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'})",
      );
      expect(result?.groups?.validator).toBe('positive');
      expect(result?.groups?.message).toBe(
        "{message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs'}",
      );
    });

    it(`custom validator message should return match for regex with japanese chars`, async () => {
      const result = CUSTOM_VALIDATOR_MESSAGE_REGEX.exec(
        ".use(z.string.min(2, { message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs' }))",
      );

      expect(result?.groups?.validator).toBe('use');
      expect(result?.groups?.pattern).toBe(
        "z.string.min(2, { message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs' })",
      );
    });

    it(`array validator message should return match for regex with japanese chars`, async () => {
      const result = CUSTOM_VALIDATOR_MESSAGE_REGEX.exec(
        ".array(min(2, { message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs' }))",
      );

      expect(result?.groups?.validator).toBe('array');
      expect(result?.groups?.pattern).toBe(
        "min(2, { message: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇs' })",
      );
    });
  });

  /////////////////////////////////////////////
  // TEST VALIDATOR MAP
  /////////////////////////////////////////////

  describe(`ExtendedDMMFFieldValidatorMap test _validatorMap`, () => {
    const field = getField();

    // LOAD INSTANCE
    // ----------------------------------------------

    it(`should load an instance`, async () => {
      expect(field).toBeDefined();
      expect(field?.['_validatorMatch']).toBeUndefined();
      expect(field?.['_validatorType']).toBeUndefined();
      expect(field?.['_validatorCustomError']).toBeUndefined();
      expect(field?.['_validatorPattern']).toBeUndefined();
      expect(field?.zodCustomErrors).toBeUndefined();
    });

    // STRING
    // ----------------------------------------------

    it(`should pass valid string data to validator map`, async () => {
      const map = field?.['_validatorMap']['string'];
      expect(
        map({
          key: 'min',
          pattern: '.min(2)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'max',
          pattern: '.max(2)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'length',
          pattern: '.length(2)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'email',
          pattern: '.email()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'url',
          pattern: '.url()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'emoji',
          pattern: '.emoji()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'uuid',
          pattern: '.uuid()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'cuid',
          pattern: '.cuid()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'cuid2',
          pattern: '.cuid2()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'ulid',
          pattern: '.ulid()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'regex',
          pattern: '.regex(/^\\d+\\s*\\d+$/)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'includes',
          pattern: '.includes("some")',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'startsWith',
          pattern: '.startsWith("some")',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'startsWith',
          pattern: '.startsWith("some")',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'datetime',
          pattern: '.datetime()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'ipv4',
          pattern: '.ipv4()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'ipv6',
          pattern: '.ipv6()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'cidrv4',
          pattern: '.cidrv4()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'cidrv6',
          pattern: '.cidrv6()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'trim',
          pattern: '.trim()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'toLowerCase',
          pattern: '.toLowerCase()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'toUpperCase',
          pattern: '.toUpperCase()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'uppercase',
          pattern: '.uppercase()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lowercase',
          pattern: '.lowercase()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'normalize',
          pattern: '.normalize()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'noDefault',
          pattern: '.noDefault()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'describe',
          pattern: '.describe("some")',
        }),
      ).toBe(true);

      // Zod v4 string format validators
      expect(
        map({
          key: 'date',
          pattern: '.date()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'time',
          pattern: '.time()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'duration',
          pattern: '.duration()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'base64',
          pattern: '.base64()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'base64url',
          pattern: '.base64url()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'hex',
          pattern: '.hex()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'jwt',
          pattern: '.jwt()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'hash',
          pattern: '.hash()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'guid',
          pattern: '.guid()',
        }),
      ).toBe(true);

      // ISO validators (aliases)
      expect(
        map({
          key: 'isoDate',
          pattern: '.isoDate()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'isoTime',
          pattern: '.isoTime()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'isoDatetime',
          pattern: '.isoDatetime()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'isoDuration',
          pattern: '.isoDuration()',
        }),
      ).toBe(true);
    });

    it(`should pass valid string with message data to validator map`, async () => {
      const map = field?.['_validatorMap']['string'];
      expect(
        map({
          key: 'min',
          pattern: '.min(2, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'max',
          pattern: '.max(2, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'length',
          pattern: '.length(2, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'email',
          pattern: '.email({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'url',
          pattern: '.url({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'emoji',
          pattern: '.emoji({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'uuid',
          pattern: '.uuid({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'cuid',
          pattern: '.cuid({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'cuid2',
          pattern: '.cuid2({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'ulid',
          pattern: '.ulid({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'regex',
          pattern: '.regex(/^\\d+\\s*\\d+$/)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'includes',
          pattern: '.includes("some", { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'startsWith',
          pattern: '.startsWith("some", { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'startsWith',
          pattern: '.startsWith("some", { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'datetime',
          pattern: '.datetime({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'trim',
          pattern: '.trim({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'toLowerCase',
          pattern: '.toLowerCase({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'toUpperCase',
          pattern: '.toUpperCase({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'uppercase',
          pattern: '.uppercase({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lowercase',
          pattern: '.lowercase({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'normalize',
          pattern: '.normalize({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(map({ key: 'noDefault', pattern: '.noDefault()' })).toBe(true);
      expect(map({ key: 'array', pattern: '.array(.length(2))' })).toBe(true);

      // Zod v4 string format validators with message support
      expect(
        map({
          key: 'date',
          pattern: '.date({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'time',
          pattern: '.time({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'duration',
          pattern: '.duration({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'base64',
          pattern: '.base64({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'base64url',
          pattern: '.base64url({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'hex',
          pattern: '.hex({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'jwt',
          pattern: '.jwt({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'hash',
          pattern: '.hash({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'guid',
          pattern: '.guid({ message: "someMessage" })',
        }),
      ).toBe(true);

      // ISO validators (aliases) with message support
      expect(
        map({
          key: 'isoDate',
          pattern: '.isoDate({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'isoTime',
          pattern: '.isoTime({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'isoDatetime',
          pattern: '.isoDatetime({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'isoDuration',
          pattern: '.isoDuration({ message: "someMessage" })',
        }),
      ).toBe(true);
    });

    it(`should pass ivalid data to to validator map`, async () => {
      const map = field?.['_validatorMap']['string'];

      expect(() =>
        map({
          key: 'array',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should pass ivalid key to to validator map`, async () => {
      const map = field?.['_validatorMap']['string'];

      expect(() =>
        map({
          key: 'wrong',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'wrong' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    // NUMBER
    // ----------------------------------------------

    it(`should pass valid number data to validator map`, async () => {
      const map = field?.['_validatorMap']['number'];
      expect(
        map({
          key: 'gt',
          pattern: '.gt(2)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'gte',
          pattern: '.gte(2)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lt',
          pattern: '.lt(2)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lte',
          pattern: '.lte(2)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'multipleOf',
          pattern: '.multipleOf(2)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'int',
          pattern: '.int()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'positive',
          pattern: '.positive()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'nonpositive',
          pattern: '.nonpositive()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'negative',
          pattern: '.negative()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'nonnegative',
          pattern: '.nonnegative()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'finite',
          pattern: '.finite()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'noDefault',
          pattern: '.noDefault()',
        }),
      ).toBe(true);

      // Zod v4 new number validators
      expect(
        map({
          key: 'int32',
          pattern: '.int32()',
        }),
      ).toBe(true);

      expect(
        map({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'describe',
          pattern: '.describe("some")',
        }),
      ).toBe(true);
    });

    it(`should pass valid number with message data to validator map`, async () => {
      const map = field?.['_validatorMap']['number'];
      expect(
        map({
          key: 'gt',
          pattern: '.gt(2, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'gte',
          pattern: '.gte(2, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lt',
          pattern: '.lt(2, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lte',
          pattern: '.lte(2, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'multipleOf',
          pattern: '.multipleOf(2, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'int',
          pattern: '.int({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'positive',
          pattern: '.positive({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'nonpositive',
          pattern: '.nonpositive({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'negative',
          pattern: '.negative({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'nonnegative',
          pattern: '.nonnegative({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'finite',
          pattern: '.finite({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'noDefault',
          pattern: '.noDefault({ message: "someMessage" })',
        }),
      ).toBe(true);

      // Zod v4 new number validators with message support
      expect(
        map({
          key: 'int32',
          pattern: '.int32({ message: "someMessage" })',
        }),
      ).toBe(true);

      expect(
        map({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
    });

    it(`should pass invalid data to to validator map`, async () => {
      const map = field?.['_validatorMap']['number'];

      expect(() =>
        map({
          key: 'array',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should pass invalid key to to validator map`, async () => {
      const map = field?.['_validatorMap']['number'];

      expect(() =>
        map({
          key: 'wrong',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'wrong' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    // DATE
    // ----------------------------------------------

    it(`should pass valid date data to validator map`, async () => {
      const map = field?.['_validatorMap']['date'];
      expect(
        map({
          key: 'min',
          pattern: '.min(new Date(01-01-2022))',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'max',
          pattern: '.max(new Date(Date.now()))',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'describe',
          pattern: '.describe("some")',
        }),
      ).toBe(true);
    });

    it(`should pass valid date with message data to validator map`, async () => {
      const map = field?.['_validatorMap']['date'];
      expect(
        map({
          key: 'min',
          pattern: '.min(new Date(01-01-2022), { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'max',
          pattern: '.max(new Date(Date.now(), { message: "someMessage" }))',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
    });

    it(`should pass invalid data to to validator map`, async () => {
      const map = field?.['_validatorMap']['date'];

      expect(() =>
        map({
          key: 'array',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should pass invalid key to to validator map`, async () => {
      const map = field?.['_validatorMap']['date'];

      expect(() =>
        map({
          key: 'wrong',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'wrong' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    // BIGINT
    // ----------------------------------------------

    it(`should pass valid bigint data to validator map`, async () => {
      const map = field?.['_validatorMap']['bigint'];
      expect(
        map({
          key: 'gt',
          pattern: '.gt(2n)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'gte',
          pattern: '.gte(2n)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lt',
          pattern: '.lt(2n)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lte',
          pattern: '.lte(2n)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'multipleOf',
          pattern: '.multipleOf(2n)',
        }),
      ).toBe(true);

      // Zod v4 BigInt aliases
      expect(
        map({
          key: 'min',
          pattern: '.min(2n)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'max',
          pattern: '.max(2n)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'step',
          pattern: '.step(2n)',
        }),
      ).toBe(true);

      expect(
        map({
          key: 'positive',
          pattern: '.positive()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'nonpositive',
          pattern: '.nonpositive()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'negative',
          pattern: '.negative()',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'nonnegative',
          pattern: '.nonnegative()',
        }),
      ).toBe(true);
      // Zod v4 BigInt aliases
      expect(
        map({
          key: 'step',
          pattern: '.step(2n)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'multipleOf',
          pattern: '.multipleOf(2n)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'describe',
          pattern: '.describe("some")',
        }),
      ).toBe(true);
    });

    it(`should pass ivalid data to to validator map`, async () => {
      const map = field?.['_validatorMap']['bigint'];
      expect(
        map({
          key: 'gt',
          pattern: '.gt(2n, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'gte',
          pattern: '.gte(2n, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lt',
          pattern: '.lt(2n, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'lte',
          pattern: '.lte(2n, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'multipleOf',
          pattern: '.multipleOf(2n, { message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'positive',
          pattern: '.positive({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'nonpositive',
          pattern: '.nonpositive({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'negative',
          pattern: '.negative({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'nonnegative',
          pattern: '.nonnegative({ message: "someMessage" })',
        }),
      ).toBe(true);
      expect(() =>
        map({
          key: 'array',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should pass ivalid key to to validator map`, async () => {
      const map = field?.['_validatorMap']['bigint'];

      expect(() =>
        map({
          key: 'wrong',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'wrong' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    // CUSTOM
    // ----------------------------------------------

    it(`should pass valid custom data to validator map`, async () => {
      const map = field?.['_validatorMap']['custom'];

      expect(
        map({
          key: 'use',
          pattern: '.use(some content)',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'omit',
          pattern: '.omit(["model", "field"])',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
      expect(
        map({
          key: 'array',
          pattern:
            '.use(z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))}))',
        }),
      ).toBe(true);
    });

    it(`should pass ivalid data to to validator map`, async () => {
      const map = field?.['_validatorMap']['custom'];

      expect(() =>
        map({
          key: 'array',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should pass ivalid key to to validator map`, async () => {
      const map = field?.['_validatorMap']['custom'];

      expect(() =>
        map({
          key: 'wrong',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'wrong' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    // ENUM
    // ----------------------------------------------

    it(`should pass valid custom data to validator map`, async () => {
      const map = field?.['_validatorMap']['enum'];

      expect(
        map({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
    });

    it(`should pass ivalid data to to validator map`, async () => {
      const map = field?.['_validatorMap']['enum'];

      expect(() =>
        map({
          key: 'array',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should pass ivalid key to to validator map`, async () => {
      const map = field?.['_validatorMap']['enum'];

      expect(() =>
        map({
          key: 'wrong',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'wrong' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    // OBJECT
    // ----------------------------------------------

    it(`should pass valid custom data to validator map`, async () => {
      const map = field?.['_validatorMap']['object'];

      expect(
        map({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
    });

    it(`should pass ivalid data to to validator map`, async () => {
      const map = field?.['_validatorMap']['object'];

      expect(() =>
        map({
          key: 'array',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should pass ivalid key to to validator map`, async () => {
      const map = field?.['_validatorMap']['object'];

      expect(() =>
        map({
          key: 'wrong',
          pattern: '.length(2)',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'wrong' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });
  });

  /////////////////////////////////////////////////
  // TEST VALIDATE PATTERN IN MAP
  /////////////////////////////////////////////////

  describe(`tests ExtendedDMMFFieldValidatorMap method _validatePatternInMap`, () => {
    it(`should pass valid data for string`, async () => {
      const field = getField({
        type: 'String',
        isList: true,
        documentation: '@zod.string.array(.length(2))',
      });

      expect(
        field?.['_validatePatternInMap']({
          key: 'array',
          pattern: '.array(.length(2))',
        }),
      ).toBe(true);
    });

    it(`should pass invalid data for string`, async () => {
      const field = getField({
        type: 'String',
        isList: true,
        documentation: '@zod.string.array(.length(2))',
      });

      expect(() =>
        field?.['_validatePatternInMap']({
          key: 'use',
          pattern: '.use(.length(2))',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'use' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });
  });

  /////////////////////////////////////////////////
  // TEST GET VALIDATOR KEY FROM PATTERN
  /////////////////////////////////////////////////

  describe(`tests ExtendedDMMFFieldValidatorMap method _getValidatorKeyFromPattern`, () => {
    it(`should pass valid data for string`, async () => {
      const field = getField();
      expect(field?.['_getValidatorKeyFromPattern']('.array(.length(2))')).toBe(
        'array',
      );
    });

    it(`should pass invalid data for string`, async () => {
      const field = getField();

      expect(() =>
        field?.['_getValidatorKeyFromPattern']('wrong(length(2))'),
      ).toThrowError(
        "[@zod generator error]: no matching validator key found in 'wrong(length(2))'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });
  });
}

/////////////////////////////////////////////////
// TEST EXEUTION/
/////////////////////////////////////////////////

testExtendedDMMFFieldValidatorMap(ExtendedDMMFFieldValidatorMap);
