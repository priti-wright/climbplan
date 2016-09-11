import React from 'react';

import styles from './ContainerWithTitle.scss';

const ContainerWithTitle = props => {
    return (
        <div className={styles.resultBox}>
            <h1 className={styles.sectionTitle}>{props.title}</h1>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    );
};

ContainerWithTitle.propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string,
};

export default ContainerWithTitle;
