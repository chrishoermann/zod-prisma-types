import { ExtendedDMMFModelClass } from '..';
import * as TESTS from './subclasses';

// Run all the subclass test suites with the final instance of the class
// to make sure that the class is working as expected an no subclass is
// breaking the functionality

Object.keys(TESTS).forEach((key) => {
  const test = TESTS[key];
  test(ExtendedDMMFModelClass);
});
