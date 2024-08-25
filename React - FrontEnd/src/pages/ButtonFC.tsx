import React, { useState } from 'react';
import './../style/styles.scss';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './../components/translate';

const shapes = ['square', 'rectangle', 'circle', 'oval', 'trapezoid', 'parallelogram'];

const ButtonFC: React.FC = () => {
    const { t } = useTranslation();
    const [shapeOrder, setShapeOrder] = useState<string[]>(shapes);
    const [isRightFirst, setIsRightFirst] = useState<boolean>(true);

    const rotateShapes = (direction: 'clockwise' | 'counterclockwise') => {
        setShapeOrder(prevOrder => {
            const newOrder = [...prevOrder];
            if (direction === 'clockwise') {
                newOrder.unshift(newOrder.pop()!);
            } else {
                newOrder.push(newOrder.shift()!);
            }
            return newOrder;
        });
    };

    const shuffleShapes = () => {
        setShapeOrder(prevOrder => {
            const shuffledOrder = [...prevOrder].sort(() => Math.random() - 0.5);
            return shuffledOrder;
        });
    };

    const swapRows = () => {
        setIsRightFirst(prevState => !prevState);
    };

    return (
        <>
            <div className='header-container'>
                <h1 className='welcome-text'>{t('welcome')}</h1>
                <LanguageSwitcher />
            </div>
            <div className="button-container">
                <div className="top-row">
                    <button className="btn" onClick={() => rotateShapes('counterclockwise')}><div id='triangle-left'></div><div className="text">{t('move')}</div></button>
                    <button className="btn-container">
                        <div className="triangle-container" onClick={swapRows}>
                            <div id="triangle-up"></div>
                            <div id="triangle-down"></div>
                            <div className="text">{t('switch')}</div>
                        </div></button>
                    <button className="btn" onClick={() => rotateShapes('clockwise')}><div id='triangle-right'></div><div className="text">{t('move')}</div></button>
                </div><br /><hr />
                <div className={`bottom-row ${isRightFirst ? 'right' : ''}`}>
                    {shapeOrder.slice(0, 3).map(shape => (
                        <div className="bottom-row-item" key={shape} onClick={shuffleShapes}>
                            <button className="btn">
                                <div id={shape}></div>
                            </button>
                        </div>
                    ))}
                </div>
                <div className={`bottom-row ${isRightFirst ? '' : 'right'}`}>
                    {shapeOrder.slice(3).map(shape => (
                        <div className="bottom-row-item" key={shape} onClick={shuffleShapes}>
                            <button className="btn">
                                <div id={shape}></div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ButtonFC;
