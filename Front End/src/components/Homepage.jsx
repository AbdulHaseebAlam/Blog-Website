import React from 'react';
import style from './homePage.module.css';

export default function Homepage() {

    // const pClasses = `${style.paragraph} ${font-medium}`;
    return (
        <>
            <div className={style.homePage}>
                <div className={style.title}>
                    <h1 className=' text-3xl font-bold'>Your Voice Matters: Amplify it with  <span className={style.eyecatchTitle}>Write-Blog</span></h1>
                    <p className={style.paragraph}>
                        "Every voice matters at Write Blog. Whether you're discussing trends, championing causes, or telling stories, your words inspire, educate, and connect.Join our inclusive community where diverse perspectives are celebrated."
                    </p>
                </div>
            </div>
        </>
    )
}
