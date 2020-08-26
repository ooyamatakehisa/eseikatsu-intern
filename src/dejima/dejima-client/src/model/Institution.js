/**
 * ES 物件API
 * （株）いい生活 が提供予定の 物件情報API のインターフェイス仕様書  いい物件Oneに登録した賃貸物件情報を参照する物件参照API仕様について定める。  ## リソース仕様  ### 通信仕様  HTTP/2 および HTTP/1.1 をサポートする。通信はTLSで暗号化されたHTTPSのみを許可する。  ### リクエストヘッダ  リクエストヘッダには以下の指定を必須とする。  | No. | リクエストヘッダのフィールド名 | 指定値 | |:---:|:-------------------------------|:-------| | 1 | Accept | application/json | | 2 | X-Api-Key | 弊社が指定するキー。ご利用のお客様を特定するためのもの。 |  Acceptヘッダには、常にapplication/json を指定する。 これにより、レスポンスがJSONであることを指示する。  ### データフォーマットと文字コード  データフォーマットはJSON、文字コードはUTF-8とする。  ### データ型  通常のJSONの型以外に擬似型としていくつかのデータ型を用意している。 これは、JSON標準では表現しきれないデータや、不動産特有のデータを扱うために定義したもので使用する。 また、ここに記載の無いデータ型については、 OpenAPI Specification (Version 3.0.2) の DataTypes に準拠する。  * [DataTypes](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#data-types)   | No. | 型 | 説明 | |:---:|:---|:-----| | 1 | string | JSON標準の文字列 | | 2 | int | JSON標準の整数 | | 3 | float | JSON標準の浮動小数点数 | | 4 | bool | JSON標準の真偽値 | | 5 | datetime | ISO8611フォーマットの日付時刻を表す文字列。YYYY-MM-DDTHH:MM:SS。 <br> 例: 2015-08-26T19:16:03 = 2015年8月26日19時16分03秒 | | 6 | date | ISO8611フォーマットの日付を表す文字列。YYYY-MM-DD。 <br> 例: 2015-08-26 = 2015年8月26日 | | 7 | datejun | 後述 |  #### datejun型  いい生活独自の日付と旬を表すフォーマット。YYYYMMJDD。  * YYYY: 西暦年 * MM: 月。01～12。ただし00とすることにより、年単位までの精度の数字を表現可能。 * J: 旬。1=上旬、2=中旬、3=下旬。 0とすることで月単位までの精度の数字を表現可能。 * DD: 日。01～31。ただし00とすることにより、旬単位までの精度の数字を表現可能。日単位の精度の場合、1～10日までは旬を1、11～20日までは旬を2、21日以降は旬を3と指定する必要がある。 * 例:     * 201900000 = 2019年     * 201901000 = 2019年1月     * 201903100 = 2019年3月上旬     * 201912300 = 2019年12月下旬     * 201906105 = 2019年6月5日     * 201908216 = 2019年8月16日  ## 検索パラメータ  ### OR 検索  パラメータタイプが `array` のキーについては、クエリパラメータで複数指定を行った場合、 指定された値のいずれかに一致する対象を検索する（ OR 検索）。  ex) `?layout_type_code=1&layout_type_code=2`  ### ソート順  `*.order` という名前のパラメータでソート順を指定可能。ascを指定したとき昇順、descを指定したとき降順となる。  ex) `?price.order=desc`  基本的にソート順は一つだけ指定する。 
 *
 * The version of the OpenAPI document: 9.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The Institution model module.
 * @module model/Institution
 * @version 9.0.0
 */
class Institution {
    /**
     * Constructs a new <code>Institution</code>.
     * 周辺施設
     * @alias module:model/Institution
     * @param institutionCategory {String} 
     * @param institutionCategoryCode {Number} 1: 総合病院<br/>2: 内科<br/>3: 小児科<br/>4: 小学校<br/>5: 中学校<br/>6: 幼稚園<br/>7: 保育所<br/>8: 公園<br/>9: スーパー<br/>10: コンビ二<br/>11: ショッピング施設<br/>12: 公共施設<br/>13: 海または川<br/>14: インターチェンジ<br/>15: コインランドリー<br/>16: ランドマーク<br/>17: 郵便局<br/>18: 銀行<br/>19: レストラン<br/>20: その他<br/>21: ドラッグストア<br/>22: ホームセンター<br/>23: 高校・高専<br/>24: 役所<br/>25: 図書館<br/>26: 警察署・交番<br/>27: 駅<br/>28: 周辺の街並み<br/>29: 商店街<br/>30: 歯科<br/>31: 大学・短大<br/>32: 専門学校
     */
    constructor(institutionCategory, institutionCategoryCode) { 
        
        Institution.initialize(this, institutionCategory, institutionCategoryCode);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, institutionCategory, institutionCategoryCode) { 
        obj['institution_category'] = institutionCategory;
        obj['institution_category_code'] = institutionCategoryCode;
    }

    /**
     * Constructs a <code>Institution</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Institution} obj Optional instance to populate.
     * @return {module:model/Institution} The populated <code>Institution</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Institution();

            if (data.hasOwnProperty('institution_category')) {
                obj['institution_category'] = ApiClient.convertToType(data['institution_category'], 'String');
            }
            if (data.hasOwnProperty('institution_category_code')) {
                obj['institution_category_code'] = ApiClient.convertToType(data['institution_category_code'], 'Number');
            }
            if (data.hasOwnProperty('institution_name')) {
                obj['institution_name'] = ApiClient.convertToType(data['institution_name'], 'String');
            }
            if (data.hasOwnProperty('relative_position')) {
                obj['relative_position'] = ApiClient.convertToType(data['relative_position'], 'String');
            }
            if (data.hasOwnProperty('relative_position_code')) {
                obj['relative_position_code'] = ApiClient.convertToType(data['relative_position_code'], 'Number');
            }
            if (data.hasOwnProperty('institution_distance')) {
                obj['institution_distance'] = ApiClient.convertToType(data['institution_distance'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * @member {String} institution_category
 */
Institution.prototype['institution_category'] = undefined;

/**
 * 1: 総合病院<br/>2: 内科<br/>3: 小児科<br/>4: 小学校<br/>5: 中学校<br/>6: 幼稚園<br/>7: 保育所<br/>8: 公園<br/>9: スーパー<br/>10: コンビ二<br/>11: ショッピング施設<br/>12: 公共施設<br/>13: 海または川<br/>14: インターチェンジ<br/>15: コインランドリー<br/>16: ランドマーク<br/>17: 郵便局<br/>18: 銀行<br/>19: レストラン<br/>20: その他<br/>21: ドラッグストア<br/>22: ホームセンター<br/>23: 高校・高専<br/>24: 役所<br/>25: 図書館<br/>26: 警察署・交番<br/>27: 駅<br/>28: 周辺の街並み<br/>29: 商店街<br/>30: 歯科<br/>31: 大学・短大<br/>32: 専門学校
 * @member {Number} institution_category_code
 */
Institution.prototype['institution_category_code'] = undefined;

/**
 * @member {String} institution_name
 */
Institution.prototype['institution_name'] = undefined;

/**
 * @member {String} relative_position
 */
Institution.prototype['relative_position'] = undefined;

/**
 * 1: 一階<br/>2: 対面<br/>3: 隣接<br/>4: 近隣<br/>5: 望む<br/>6: 沿い<br/>7: 敷地内
 * @member {Number} relative_position_code
 */
Institution.prototype['relative_position_code'] = undefined;

/**
 * @member {Number} institution_distance
 */
Institution.prototype['institution_distance'] = undefined;






export default Institution;

