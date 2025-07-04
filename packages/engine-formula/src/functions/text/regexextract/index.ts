/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { BaseValueObject } from '../../../engine/value-object/base-value-object';
import { ErrorType } from '../../../basics/error-type';
import { checkVariantsErrorIsArray } from '../../../engine/utils/check-variant-error';
import { handleRegExp } from '../../../engine/utils/regexp-check';
import { ArrayValueObject } from '../../../engine/value-object/array-value-object';
import { ErrorValueObject } from '../../../engine/value-object/base-value-object';
import { StringValueObject } from '../../../engine/value-object/primitive-object';
import { BaseFunction } from '../../base-function';

export class Regexextract extends BaseFunction {
    override minParams = 2;

    override maxParams = 2;

    override calculate(text: BaseValueObject, regularExpression: BaseValueObject): BaseValueObject {
        const { isError, errorObject, variants } = checkVariantsErrorIsArray(text, regularExpression);

        if (isError) {
            return errorObject as ErrorValueObject;
        }

        const [textObject, regularExpressionObject] = variants as BaseValueObject[];

        let textValue = textObject.getValue();

        if (textObject.isNull()) {
            textValue = '';
        }

        if (textObject.isBoolean()) {
            textValue = textValue ? 'TRUE' : 'FALSE';
        }

        textValue = `${textValue}`;

        let regularExpressionValue = regularExpressionObject.getValue();

        if (regularExpressionObject.isNull()) {
            regularExpressionValue = '';
        }

        if (regularExpressionObject.isBoolean()) {
            regularExpressionValue = regularExpressionValue ? 'TRUE' : 'FALSE';
        }

        regularExpressionValue = `${regularExpressionValue}`;

        const { isError: isError_regExp, regExp } = handleRegExp(regularExpressionValue, false);

        if (isError_regExp) {
            return ErrorValueObject.create(ErrorType.REF);
        }

        const result = textValue.match(regExp as RegExp);

        if (result === null) {
            return ErrorValueObject.create(ErrorType.NA);
        }

        if (result.length > 1) {
            const resultArray = result.slice(1).map((item) => StringValueObject.create(item));

            if (resultArray.length > 1) {
                return ArrayValueObject.create({
                    calculateValueList: [resultArray],
                    rowCount: 1,
                    columnCount: resultArray.length,
                    unitId: this.unitId as string,
                    sheetId: this.subUnitId as string,
                    row: this.row,
                    column: this.column,
                });
            }

            return resultArray[0];
        }

        return StringValueObject.create(result[0]);
    }
}
