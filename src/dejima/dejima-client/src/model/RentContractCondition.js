/**
 * ES 物件API
 * （株）いい生活 が提供予定の 物件情報API のインターフェイス仕様書  いい物件Oneに登録した賃貸物件情報を参照する物件参照API仕様について定める。  ※1: 開発中のため、実際のリリース時の仕様は異なる場合がございます。  ※2: 売買物件に関する仕様に関してはα版であり、今後大きな仕様の見直しを行う可能性がございます。  ## リソース仕様  ### 通信仕様  HTTP/2 および HTTP/1.1 をサポートする。通信はTLSで暗号化されたHTTPSのみを許可する。  ### リクエストヘッダ  リクエストヘッダには以下の指定を必須とする。  | No. | リクエストヘッダのフィールド名 | 指定値 | |:---:|:-------------------------------|:-------| | 1 | Accept | application/json | | 2 | X-Api-Key | 弊社が指定するキー。ご利用のお客様を特定するためのもの。 |  Acceptヘッダには、常にapplication/json を指定する。 これにより、レスポンスがJSONであることを指示する。  ### データフォーマットと文字コード  データフォーマットはJSON、文字コードはUTF-8とする。  ### データ型  通常のJSONの型以外に擬似型としていくつかのデータ型を用意している。 これは、JSON標準では表現しきれないデータや、不動産特有のデータを扱うために定義したもので使用する。 また、ここに記載の無いデータ型については、 OpenAPI Specification (Version 3.0.2) の DataTypes に準拠する。  * [DataTypes](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#data-types)   | No. | 型 | 説明 | |:---:|:---|:-----| | 1 | string | JSON標準の文字列 | | 2 | int | JSON標準の整数 | | 3 | float | JSON標準の浮動小数点数 | | 4 | bool | JSON標準の真偽値 | | 5 | datetime | ISO8611フォーマットの日付時刻を表す文字列。YYYY-MM-DDTHH:MM:SS。 <br> 例: 2015-08-26T19:16:03 = 2015年8月26日19時16分03秒 | | 6 | date | ISO8611フォーマットの日付を表す文字列。YYYY-MM-DD。 <br> 例: 2015-08-26 = 2015年8月26日 | | 7 | datejun | 後述 |  #### datejun型  いい生活独自の日付と旬を表すフォーマット。YYYYMMJDD。  * YYYY: 西暦年 * MM: 月。01～12。ただし00とすることにより、年単位までの精度の数字を表現可能。 * J: 旬。1=上旬、2=中旬、3=下旬。 0とすることで月単位までの精度の数字を表現可能。 * DD: 日。01～31。ただし00とすることにより、旬単位までの精度の数字を表現可能。日単位の精度の場合、1～10日までは旬を1、11～20日までは旬を2、21日以降は旬を3と指定する必要がある。 * 例:     * 201900000 = 2019年     * 201901000 = 2019年1月     * 201903100 = 2019年3月上旬     * 201912300 = 2019年12月下旬     * 201906105 = 2019年6月5日     * 201908216 = 2019年8月16日  ## 検索パラメータ  ### OR 検索  パラメータタイプが `array` のキーについては、クエリパラメータで複数指定を行った場合、 指定された値のいずれかに一致する対象を検索する（ OR 検索）。  ex) `?layout_type_code=1&layout_type_code=2`  ### ソート順  `*.order` という名前のパラメータでソート順を指定可能。ascを指定したとき昇順、descを指定したとき降順となる。  ex) `?price.order=desc`  基本的にソート順は一つだけ指定する。 
 *
 * The version of the OpenAPI document: 6.1.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import DateJun from './DateJun';
import Deposit from './Deposit';
import FreeRent from './FreeRent';
import Insurance from './Insurance';
import OtherInitialCost from './OtherInitialCost';
import OtherMonthlyCost from './OtherMonthlyCost';
import Price from './Price';
import PriceWithUnit from './PriceWithUnit';
import RenewalFee from './RenewalFee';
import RentBrokerageAllocation from './RentBrokerageAllocation';
import RentPeriod from './RentPeriod';
import Tokuyuchin from './Tokuyuchin';

/**
 * The RentContractCondition model module.
 * @module model/RentContractCondition
 * @version 6.1.3
 */
class RentContractCondition {
    /**
     * Constructs a new <code>RentContractCondition</code>.
     * 賃貸契約条件
     * @alias module:model/RentContractCondition
     * @param price {module:model/Price} 現貸料
     * @param otherInitialCost {Array.<module:model/OtherInitialCost>} 
     * @param otherMonthlyCost {Array.<module:model/OtherMonthlyCost>} 
     */
    constructor(price, otherInitialCost, otherMonthlyCost) { 
        
        RentContractCondition.initialize(this, price, otherInitialCost, otherMonthlyCost);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, price, otherInitialCost, otherMonthlyCost) { 
        obj['price'] = price;
        obj['other_initial_cost'] = otherInitialCost;
        obj['other_monthly_cost'] = otherMonthlyCost;
    }

    /**
     * Constructs a <code>RentContractCondition</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RentContractCondition} obj Optional instance to populate.
     * @return {module:model/RentContractCondition} The populated <code>RentContractCondition</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RentContractCondition();

            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], Price);
            }
            if (data.hasOwnProperty('price_update_date')) {
                obj['price_update_date'] = ApiClient.convertToType(data['price_update_date'], 'Date');
            }
            if (data.hasOwnProperty('price_per_tsubo')) {
                obj['price_per_tsubo'] = ApiClient.convertToType(data['price_per_tsubo'], 'Number');
            }
            if (data.hasOwnProperty('manage_cost')) {
                obj['manage_cost'] = ApiClient.convertToType(data['manage_cost'], PriceWithUnit);
            }
            if (data.hasOwnProperty('service_fee')) {
                obj['service_fee'] = ApiClient.convertToType(data['service_fee'], PriceWithUnit);
            }
            if (data.hasOwnProperty('deposit')) {
                obj['deposit'] = ApiClient.convertToType(data['deposit'], Deposit);
            }
            if (data.hasOwnProperty('key_money')) {
                obj['key_money'] = ApiClient.convertToType(data['key_money'], PriceWithUnit);
            }
            if (data.hasOwnProperty('repair_cost')) {
                obj['repair_cost'] = ApiClient.convertToType(data['repair_cost'], PriceWithUnit);
            }
            if (data.hasOwnProperty('guarantee_amortization_class')) {
                obj['guarantee_amortization_class'] = ApiClient.convertToType(data['guarantee_amortization_class'], 'String');
            }
            if (data.hasOwnProperty('guarantee_amortization_class_code')) {
                obj['guarantee_amortization_class_code'] = ApiClient.convertToType(data['guarantee_amortization_class_code'], 'String');
            }
            if (data.hasOwnProperty('guarantee_price')) {
                obj['guarantee_price'] = ApiClient.convertToType(data['guarantee_price'], PriceWithUnit);
            }
            if (data.hasOwnProperty('amortization_expense')) {
                obj['amortization_expense'] = ApiClient.convertToType(data['amortization_expense'], PriceWithUnit);
            }
            if (data.hasOwnProperty('premium')) {
                obj['premium'] = ApiClient.convertToType(data['premium'], PriceWithUnit);
            }
            if (data.hasOwnProperty('fixtures_cost')) {
                obj['fixtures_cost'] = ApiClient.convertToType(data['fixtures_cost'], 'Number');
            }
            if (data.hasOwnProperty('tokuyuchin')) {
                obj['tokuyuchin'] = ApiClient.convertToType(data['tokuyuchin'], Tokuyuchin);
            }
            if (data.hasOwnProperty('is_tokuyuchin')) {
                obj['is_tokuyuchin'] = ApiClient.convertToType(data['is_tokuyuchin'], 'Boolean');
            }
            if (data.hasOwnProperty('renewal_fee')) {
                obj['renewal_fee'] = ApiClient.convertToType(data['renewal_fee'], RenewalFee);
            }
            if (data.hasOwnProperty('misc_expense')) {
                obj['misc_expense'] = ApiClient.convertToType(data['misc_expense'], PriceWithUnit);
            }
            if (data.hasOwnProperty('insurance')) {
                obj['insurance'] = ApiClient.convertToType(data['insurance'], Insurance);
            }
            if (data.hasOwnProperty('has_insurance')) {
                obj['has_insurance'] = ApiClient.convertToType(data['has_insurance'], 'Boolean');
            }
            if (data.hasOwnProperty('rent_brokerage_allocation')) {
                obj['rent_brokerage_allocation'] = ApiClient.convertToType(data['rent_brokerage_allocation'], RentBrokerageAllocation);
            }
            if (data.hasOwnProperty('free_rent')) {
                obj['free_rent'] = ApiClient.convertToType(data['free_rent'], FreeRent);
            }
            if (data.hasOwnProperty('other_initial_cost')) {
                obj['other_initial_cost'] = ApiClient.convertToType(data['other_initial_cost'], [OtherInitialCost]);
            }
            if (data.hasOwnProperty('other_monthly_cost')) {
                obj['other_monthly_cost'] = ApiClient.convertToType(data['other_monthly_cost'], [OtherMonthlyCost]);
            }
            if (data.hasOwnProperty('other_cost_comment')) {
                obj['other_cost_comment'] = ApiClient.convertToType(data['other_cost_comment'], 'String');
            }
            if (data.hasOwnProperty('initial_cost_credit_card_available_flag')) {
                obj['initial_cost_credit_card_available_flag'] = ApiClient.convertToType(data['initial_cost_credit_card_available_flag'], 'Boolean');
            }
            if (data.hasOwnProperty('monthly_cost_credit_card_available_flag')) {
                obj['monthly_cost_credit_card_available_flag'] = ApiClient.convertToType(data['monthly_cost_credit_card_available_flag'], 'Boolean');
            }
            if (data.hasOwnProperty('initial_cost')) {
                obj['initial_cost'] = ApiClient.convertToType(data['initial_cost'], 'String');
            }
            if (data.hasOwnProperty('initial_cost_code')) {
                obj['initial_cost_code'] = ApiClient.convertToType(data['initial_cost_code'], 'Number');
            }
            if (data.hasOwnProperty('guarantor_company_requirements')) {
                obj['guarantor_company_requirements'] = ApiClient.convertToType(data['guarantor_company_requirements'], 'String');
            }
            if (data.hasOwnProperty('guarantor_company_requirements_code')) {
                obj['guarantor_company_requirements_code'] = ApiClient.convertToType(data['guarantor_company_requirements_code'], 'Number');
            }
            if (data.hasOwnProperty('guarantor_company_name')) {
                obj['guarantor_company_name'] = ApiClient.convertToType(data['guarantor_company_name'], 'String');
            }
            if (data.hasOwnProperty('guarantor_company_contract_detail')) {
                obj['guarantor_company_contract_detail'] = ApiClient.convertToType(data['guarantor_company_contract_detail'], 'String');
            }
            if (data.hasOwnProperty('no_guarantor_flag')) {
                obj['no_guarantor_flag'] = ApiClient.convertToType(data['no_guarantor_flag'], 'Boolean');
            }
            if (data.hasOwnProperty('guarantor_requirements')) {
                obj['guarantor_requirements'] = ApiClient.convertToType(data['guarantor_requirements'], 'String');
            }
            if (data.hasOwnProperty('guarantor_requirements_code')) {
                obj['guarantor_requirements_code'] = ApiClient.convertToType(data['guarantor_requirements_code'], 'Number');
            }
            if (data.hasOwnProperty('rent_period')) {
                obj['rent_period'] = ApiClient.convertToType(data['rent_period'], RentPeriod);
            }
            if (data.hasOwnProperty('available_datejun')) {
                obj['available_datejun'] = ApiClient.convertToType(data['available_datejun'], DateJun);
            }
            if (data.hasOwnProperty('available')) {
                obj['available'] = ApiClient.convertToType(data['available'], 'String');
            }
            if (data.hasOwnProperty('available_code')) {
                obj['available_code'] = ApiClient.convertToType(data['available_code'], 'Number');
            }
            if (data.hasOwnProperty('rent_transaction_form')) {
                obj['rent_transaction_form'] = ApiClient.convertToType(data['rent_transaction_form'], 'String');
            }
            if (data.hasOwnProperty('rent_transaction_form_code')) {
                obj['rent_transaction_form_code'] = ApiClient.convertToType(data['rent_transaction_form_code'], 'Number');
            }
            if (data.hasOwnProperty('student_restriction')) {
                obj['student_restriction'] = ApiClient.convertToType(data['student_restriction'], 'String');
            }
            if (data.hasOwnProperty('student_restriction_code')) {
                obj['student_restriction_code'] = ApiClient.convertToType(data['student_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('gender_restriction')) {
                obj['gender_restriction'] = ApiClient.convertToType(data['gender_restriction'], 'String');
            }
            if (data.hasOwnProperty('gender_restriction_code')) {
                obj['gender_restriction_code'] = ApiClient.convertToType(data['gender_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('kids_restriction')) {
                obj['kids_restriction'] = ApiClient.convertToType(data['kids_restriction'], 'String');
            }
            if (data.hasOwnProperty('kids_restriction_code')) {
                obj['kids_restriction_code'] = ApiClient.convertToType(data['kids_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('one_person_restriction')) {
                obj['one_person_restriction'] = ApiClient.convertToType(data['one_person_restriction'], 'String');
            }
            if (data.hasOwnProperty('one_person_restriction_code')) {
                obj['one_person_restriction_code'] = ApiClient.convertToType(data['one_person_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('two_persons_restriction')) {
                obj['two_persons_restriction'] = ApiClient.convertToType(data['two_persons_restriction'], 'String');
            }
            if (data.hasOwnProperty('two_persons_restriction_code')) {
                obj['two_persons_restriction_code'] = ApiClient.convertToType(data['two_persons_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('elder_restriction')) {
                obj['elder_restriction'] = ApiClient.convertToType(data['elder_restriction'], 'String');
            }
            if (data.hasOwnProperty('elder_restriction_code')) {
                obj['elder_restriction_code'] = ApiClient.convertToType(data['elder_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('corporate_contract_restriction')) {
                obj['corporate_contract_restriction'] = ApiClient.convertToType(data['corporate_contract_restriction'], 'String');
            }
            if (data.hasOwnProperty('corporate_contract_restriction_code')) {
                obj['corporate_contract_restriction_code'] = ApiClient.convertToType(data['corporate_contract_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('pet_restriction')) {
                obj['pet_restriction'] = ApiClient.convertToType(data['pet_restriction'], 'String');
            }
            if (data.hasOwnProperty('pet_restriction_code')) {
                obj['pet_restriction_code'] = ApiClient.convertToType(data['pet_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('office_usage_restriction')) {
                obj['office_usage_restriction'] = ApiClient.convertToType(data['office_usage_restriction'], 'String');
            }
            if (data.hasOwnProperty('office_usage_restriction_code')) {
                obj['office_usage_restriction_code'] = ApiClient.convertToType(data['office_usage_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('musical_instrument_restriction')) {
                obj['musical_instrument_restriction'] = ApiClient.convertToType(data['musical_instrument_restriction'], 'String');
            }
            if (data.hasOwnProperty('musical_instrument_restriction_code')) {
                obj['musical_instrument_restriction_code'] = ApiClient.convertToType(data['musical_instrument_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('restaurant_usage_restriction')) {
                obj['restaurant_usage_restriction'] = ApiClient.convertToType(data['restaurant_usage_restriction'], 'String');
            }
            if (data.hasOwnProperty('restaurant_usage_restriction_code')) {
                obj['restaurant_usage_restriction_code'] = ApiClient.convertToType(data['restaurant_usage_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('room_sharing_restriction')) {
                obj['room_sharing_restriction'] = ApiClient.convertToType(data['room_sharing_restriction'], 'String');
            }
            if (data.hasOwnProperty('room_sharing_restriction_code')) {
                obj['room_sharing_restriction_code'] = ApiClient.convertToType(data['room_sharing_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('foreigner_restriction')) {
                obj['foreigner_restriction'] = ApiClient.convertToType(data['foreigner_restriction'], 'String');
            }
            if (data.hasOwnProperty('foreigner_restriction_code')) {
                obj['foreigner_restriction_code'] = ApiClient.convertToType(data['foreigner_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('friends_restriction')) {
                obj['friends_restriction'] = ApiClient.convertToType(data['friends_restriction'], 'String');
            }
            if (data.hasOwnProperty('friends_restriction_code')) {
                obj['friends_restriction_code'] = ApiClient.convertToType(data['friends_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('foreign_student_restriction')) {
                obj['foreign_student_restriction'] = ApiClient.convertToType(data['foreign_student_restriction'], 'String');
            }
            if (data.hasOwnProperty('foreign_student_restriction_code')) {
                obj['foreign_student_restriction_code'] = ApiClient.convertToType(data['foreign_student_restriction_code'], 'Number');
            }
            if (data.hasOwnProperty('deposit_for_student')) {
                obj['deposit_for_student'] = ApiClient.convertToType(data['deposit_for_student'], 'String');
            }
            if (data.hasOwnProperty('deposit_for_student_code')) {
                obj['deposit_for_student_code'] = ApiClient.convertToType(data['deposit_for_student_code'], 'Number');
            }
            if (data.hasOwnProperty('other_condition')) {
                obj['other_condition'] = ApiClient.convertToType(data['other_condition'], 'String');
            }
        }
        return obj;
    }


}

/**
 * 現貸料
 * @member {module:model/Price} price
 */
RentContractCondition.prototype['price'] = undefined;

/**
 * @member {Date} price_update_date
 */
RentContractCondition.prototype['price_update_date'] = undefined;

/**
 * @member {Number} price_per_tsubo
 */
RentContractCondition.prototype['price_per_tsubo'] = undefined;

/**
 * 管理費
 * @member {module:model/PriceWithUnit} manage_cost
 */
RentContractCondition.prototype['manage_cost'] = undefined;

/**
 * 共益費
 * @member {module:model/PriceWithUnit} service_fee
 */
RentContractCondition.prototype['service_fee'] = undefined;

/**
 * @member {module:model/Deposit} deposit
 */
RentContractCondition.prototype['deposit'] = undefined;

/**
 * 礼金
 * @member {module:model/PriceWithUnit} key_money
 */
RentContractCondition.prototype['key_money'] = undefined;

/**
 * 敷引金
 * @member {module:model/PriceWithUnit} repair_cost
 */
RentContractCondition.prototype['repair_cost'] = undefined;

/**
 * @member {String} guarantee_amortization_class
 */
RentContractCondition.prototype['guarantee_amortization_class'] = undefined;

/**
 * 1: 年<br/>2: 更新時<br/>3: 解約時<br/>4: 契約時
 * @member {String} guarantee_amortization_class_code
 */
RentContractCondition.prototype['guarantee_amortization_class_code'] = undefined;

/**
 * 保証金
 * @member {module:model/PriceWithUnit} guarantee_price
 */
RentContractCondition.prototype['guarantee_price'] = undefined;

/**
 * 償却金
 * @member {module:model/PriceWithUnit} amortization_expense
 */
RentContractCondition.prototype['amortization_expense'] = undefined;

/**
 * 権利金
 * @member {module:model/PriceWithUnit} premium
 */
RentContractCondition.prototype['premium'] = undefined;

/**
 * @member {Number} fixtures_cost
 */
RentContractCondition.prototype['fixtures_cost'] = undefined;

/**
 * @member {module:model/Tokuyuchin} tokuyuchin
 */
RentContractCondition.prototype['tokuyuchin'] = undefined;

/**
 * @member {Boolean} is_tokuyuchin
 */
RentContractCondition.prototype['is_tokuyuchin'] = undefined;

/**
 * @member {module:model/RenewalFee} renewal_fee
 */
RentContractCondition.prototype['renewal_fee'] = undefined;

/**
 * 雑費
 * @member {module:model/PriceWithUnit} misc_expense
 */
RentContractCondition.prototype['misc_expense'] = undefined;

/**
 * @member {module:model/Insurance} insurance
 */
RentContractCondition.prototype['insurance'] = undefined;

/**
 * @member {Boolean} has_insurance
 */
RentContractCondition.prototype['has_insurance'] = undefined;

/**
 * @member {module:model/RentBrokerageAllocation} rent_brokerage_allocation
 */
RentContractCondition.prototype['rent_brokerage_allocation'] = undefined;

/**
 * @member {module:model/FreeRent} free_rent
 */
RentContractCondition.prototype['free_rent'] = undefined;

/**
 * @member {Array.<module:model/OtherInitialCost>} other_initial_cost
 */
RentContractCondition.prototype['other_initial_cost'] = undefined;

/**
 * @member {Array.<module:model/OtherMonthlyCost>} other_monthly_cost
 */
RentContractCondition.prototype['other_monthly_cost'] = undefined;

/**
 * @member {String} other_cost_comment
 */
RentContractCondition.prototype['other_cost_comment'] = undefined;

/**
 * @member {Boolean} initial_cost_credit_card_available_flag
 */
RentContractCondition.prototype['initial_cost_credit_card_available_flag'] = undefined;

/**
 * @member {Boolean} monthly_cost_credit_card_available_flag
 */
RentContractCondition.prototype['monthly_cost_credit_card_available_flag'] = undefined;

/**
 * @member {String} initial_cost
 */
RentContractCondition.prototype['initial_cost'] = undefined;

/**
 * 1: 五万円以下<br/>2: 十万円以下<br/>3: 十五万円以下<br/>4: 二十万円以下<br/>5: 三十万円以下<br/>99: その他
 * @member {Number} initial_cost_code
 * @default 99
 */
RentContractCondition.prototype['initial_cost_code'] = 99;

/**
 * @member {String} guarantor_company_requirements
 */
RentContractCondition.prototype['guarantor_company_requirements'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 必須
 * @member {Number} guarantor_company_requirements_code
 */
RentContractCondition.prototype['guarantor_company_requirements_code'] = undefined;

/**
 * @member {String} guarantor_company_name
 */
RentContractCondition.prototype['guarantor_company_name'] = undefined;

/**
 * @member {String} guarantor_company_contract_detail
 */
RentContractCondition.prototype['guarantor_company_contract_detail'] = undefined;

/**
 * 非推奨のため代わりにguarantor_requirements_codeを使うこと。
 * @member {Boolean} no_guarantor_flag
 * @default false
 */
RentContractCondition.prototype['no_guarantor_flag'] = false;

/**
 * @member {String} guarantor_requirements
 */
RentContractCondition.prototype['guarantor_requirements'] = undefined;

/**
 * 1: 要<br/>2: 不要<br/>3: 未入力
 * @member {Number} guarantor_requirements_code
 * @default 3
 */
RentContractCondition.prototype['guarantor_requirements_code'] = 3;

/**
 * @member {module:model/RentPeriod} rent_period
 */
RentContractCondition.prototype['rent_period'] = undefined;

/**
 * 入居可能日／引渡可能日
 * @member {module:model/DateJun} available_datejun
 */
RentContractCondition.prototype['available_datejun'] = undefined;

/**
 * @member {String} available
 */
RentContractCondition.prototype['available'] = undefined;

/**
 * 1: 即時<br/>2: 相談<br/>3: 期日指定<br/>4: 予定
 * @member {Number} available_code
 */
RentContractCondition.prototype['available_code'] = undefined;

/**
 * @member {String} rent_transaction_form
 */
RentContractCondition.prototype['rent_transaction_form'] = undefined;

/**
 * 1: 貸主<br/>2: 代理<br/>3: 仲介元付(専任)<br/>4: 仲介元付(一般)<br/>5: 仲介先物<br/>6: 仲介元付<br/>7: 仲介
 * @member {Number} rent_transaction_form_code
 */
RentContractCondition.prototype['rent_transaction_form_code'] = undefined;

/**
 * @member {String} student_restriction
 */
RentContractCondition.prototype['student_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談<br/>4: 限定<br/>5: 希望<br/>6: 歓迎
 * @member {Number} student_restriction_code
 */
RentContractCondition.prototype['student_restriction_code'] = undefined;

/**
 * @member {String} gender_restriction
 */
RentContractCondition.prototype['gender_restriction'] = undefined;

/**
 * 1: 不問<br/>2: 女性限定<br/>3: 男性限定<br/>4: 女性希望<br/>5: 男性希望
 * @member {Number} gender_restriction_code
 */
RentContractCondition.prototype['gender_restriction_code'] = undefined;

/**
 * @member {String} kids_restriction
 */
RentContractCondition.prototype['kids_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談
 * @member {Number} kids_restriction_code
 */
RentContractCondition.prototype['kids_restriction_code'] = undefined;

/**
 * @member {String} one_person_restriction
 */
RentContractCondition.prototype['one_person_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談<br/>4: 限定<br/>5: 希望
 * @member {Number} one_person_restriction_code
 */
RentContractCondition.prototype['one_person_restriction_code'] = undefined;

/**
 * @member {String} two_persons_restriction
 */
RentContractCondition.prototype['two_persons_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談<br/>4: 限定<br/>5: 希望<br/>6: 歓迎
 * @member {Number} two_persons_restriction_code
 */
RentContractCondition.prototype['two_persons_restriction_code'] = undefined;

/**
 * @member {String} elder_restriction
 */
RentContractCondition.prototype['elder_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談<br/>4: 限定<br/>5: 希望<br/>6: 歓迎
 * @member {Number} elder_restriction_code
 */
RentContractCondition.prototype['elder_restriction_code'] = undefined;

/**
 * @member {String} corporate_contract_restriction
 */
RentContractCondition.prototype['corporate_contract_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談<br/>4: 限定<br/>5: 希望
 * @member {Number} corporate_contract_restriction_code
 */
RentContractCondition.prototype['corporate_contract_restriction_code'] = undefined;

/**
 * @member {String} pet_restriction
 */
RentContractCondition.prototype['pet_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談
 * @member {Number} pet_restriction_code
 */
RentContractCondition.prototype['pet_restriction_code'] = undefined;

/**
 * @member {String} office_usage_restriction
 */
RentContractCondition.prototype['office_usage_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談
 * @member {Number} office_usage_restriction_code
 */
RentContractCondition.prototype['office_usage_restriction_code'] = undefined;

/**
 * @member {String} musical_instrument_restriction
 */
RentContractCondition.prototype['musical_instrument_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談
 * @member {Number} musical_instrument_restriction_code
 */
RentContractCondition.prototype['musical_instrument_restriction_code'] = undefined;

/**
 * @member {String} restaurant_usage_restriction
 */
RentContractCondition.prototype['restaurant_usage_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談
 * @member {Number} restaurant_usage_restriction_code
 */
RentContractCondition.prototype['restaurant_usage_restriction_code'] = undefined;

/**
 * @member {String} room_sharing_restriction
 */
RentContractCondition.prototype['room_sharing_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談
 * @member {Number} room_sharing_restriction_code
 */
RentContractCondition.prototype['room_sharing_restriction_code'] = undefined;

/**
 * @member {String} foreigner_restriction
 */
RentContractCondition.prototype['foreigner_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談
 * @member {Number} foreigner_restriction_code
 */
RentContractCondition.prototype['foreigner_restriction_code'] = undefined;

/**
 * @member {String} friends_restriction
 */
RentContractCondition.prototype['friends_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談
 * @member {Number} friends_restriction_code
 */
RentContractCondition.prototype['friends_restriction_code'] = undefined;

/**
 * @member {String} foreign_student_restriction
 */
RentContractCondition.prototype['foreign_student_restriction'] = undefined;

/**
 * 1: 不可<br/>2: 可<br/>3: 相談
 * @member {Number} foreign_student_restriction_code
 */
RentContractCondition.prototype['foreign_student_restriction_code'] = undefined;

/**
 * @member {String} deposit_for_student
 */
RentContractCondition.prototype['deposit_for_student'] = undefined;

/**
 * 1: 不要<br/>2: 一ヶ月<br/>3: 二ヶ月
 * @member {Number} deposit_for_student_code
 */
RentContractCondition.prototype['deposit_for_student_code'] = undefined;

/**
 * @member {String} other_condition
 */
RentContractCondition.prototype['other_condition'] = undefined;






export default RentContractCondition;
