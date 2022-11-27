import { css } from 'goober'
import { getEnv } from '../../modules/env'
import { color, md } from '../../modules/css'

const name = getEnv().name

interface Props {
    className?: string
}

export const AppMe = ({ className }: Props) => {
    return (
        <div className={className + ' ' + css`
            max-width: ${md}px;
            margin-right: auto;
            margin-left: auto;
        `}>
            <h2 className={css`
                font-weight: normal;
                font-size: 22px;
                margin-bottom: 10px;
                color: ${color['grey-5']};
            `}>
                {name}
            </h2>
            <div className={css`
                padding-left: 1px;
                color: ${color['grey-6']};
            `}>
                <p className={css`
                    font-size: 16px;
                    margin-bottom: 20px;
                `}>
                    Laravel / Vue.js (2.x) / React (16~17) / TypeScript
                </p>
                <ul className={css`
                    font-size: 16px;
                    padding-left: 20px;
                    margin-bottom: 20px;
                `}>
                    <li>1996 ~ 沖縄で生存</li>
                    <li>2012 ~ 2013 ミシガン州のグランドヘイブンという穏やかな町でホームステイ</li>
                    <li>2014 ~ 2018 琉球大学（物質地球科学物理系）</li>
                    <li>2018 ~ 2020 沖縄の町のホームページ屋さん</li>
                    <li>2020 ~ 2022 札幌のWEB屋さん</li>
                    <li>2022 ~ フリー</li>
                </ul>
                <p className={css`
                    font-size: 16px;
                `}>
                    React / TypeScript プロジェクトでブラウザテストを整備しデグレ検知しつつ、<br />
                    リファクタリング、ユニットテストの整備をすることが趣味です。<br />
                </p>
            </div>
        </div>
    )
}
