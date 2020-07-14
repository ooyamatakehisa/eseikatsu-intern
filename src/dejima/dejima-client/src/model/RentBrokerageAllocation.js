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
import PriceWithUnit from './PriceWithUnit';

/**
 * The RentBrokerageAllocation model module.
 * @module model/RentBrokerageAllocation
 * @version 6.1.3
 */
class RentBrokerageAllocation {
    /**
     * Constructs a new <code>RentBrokerageAllocation</code>.
     * 賃貸仲介手数料
     * @alias module:model/RentBrokerageAllocation
     */
    constructor() { 
        
        RentBrokerageAllocation.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>RentBrokerageAllocation</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RentBrokerageAllocation} obj Optional instance to populate.
     * @return {module:model/RentBrokerageAllocation} The populated <code>RentBrokerageAllocation</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RentBrokerageAllocation();

            if (data.hasOwnProperty('brokerage')) {
                obj['brokerage'] = ApiClient.convertToType(data['brokerage'], PriceWithUnit);
            }
            if (data.hasOwnProperty('advertising_fee')) {
                obj['advertising_fee'] = ApiClient.convertToType(data['advertising_fee'], PriceWithUnit);
            }
            if (data.hasOwnProperty('rent_reward_style')) {
                obj['rent_reward_style'] = ApiClient.convertToType(data['rent_reward_style'], 'String');
            }
            if (data.hasOwnProperty('rent_reward_style_code')) {
                obj['rent_reward_style_code'] = ApiClient.convertToType(data['rent_reward_style_code'], 'Number');
            }
            if (data.hasOwnProperty('borrower_rate')) {
                obj['borrower_rate'] = ApiClient.convertToType(data['borrower_rate'], 'Number');
            }
            if (data.hasOwnProperty('owner_rate')) {
                obj['owner_rate'] = ApiClient.convertToType(data['owner_rate'], 'Number');
            }
            if (data.hasOwnProperty('borrower_side_agent_rate')) {
                obj['borrower_side_agent_rate'] = ApiClient.convertToType(data['borrower_side_agent_rate'], 'Number');
            }
            if (data.hasOwnProperty('owner_side_agent_rate')) {
                obj['owner_side_agent_rate'] = ApiClient.convertToType(data['owner_side_agent_rate'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * 仲介手数料
 * @member {module:model/PriceWithUnit} brokerage
 */
RentBrokerageAllocation.prototype['brokerage'] = undefined;

/**
 * 広告料
 * @member {module:model/PriceWithUnit} advertising_fee
 */
RentBrokerageAllocation.prototype['advertising_fee'] = undefined;

/**
 * @member {String} rent_reward_style
 */
RentBrokerageAllocation.prototype['rent_reward_style'] = undefined;

/**
 * 1: 分かれ<br/>2: 当方不払<br/>3: 当方全額<br/>4: 当方半額<br/>5: 貸主折半<br/>6: 借主折半<br/>7: その他
 * @member {Number} rent_reward_style_code
 */
RentBrokerageAllocation.prototype['rent_reward_style_code'] = undefined;

/**
 * @member {Number} borrower_rate
 */
RentBrokerageAllocation.prototype['borrower_rate'] = undefined;

/**
 * @member {Number} owner_rate
 */
RentBrokerageAllocation.prototype['owner_rate'] = undefined;

/**
 * @member {Number} borrower_side_agent_rate
 */
RentBrokerageAllocation.prototype['borrower_side_agent_rate'] = undefined;

/**
 * @member {Number} owner_side_agent_rate
 */
RentBrokerageAllocation.prototype['owner_side_agent_rate'] = undefined;






export default RentBrokerageAllocation;

