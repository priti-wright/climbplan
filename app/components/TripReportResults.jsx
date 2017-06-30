import _ from 'lodash';
import React from 'react';

import loadingIndicatorImage from '../static/loadingIndicator.gif';
import {fetchTripReports} from '../actions/tripReports';
import {trackOutboundLink} from '../ga';
import styles from './TripReportResults.scss';
import ContainerWithTitle from './ContainerWithTitle';


const tripReportProp = React.PropTypes.shape({
    site: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    date: React.PropTypes.object.isRequired,
    title: React.PropTypes.string,
    route: React.PropTypes.string,
    has_gps: React.PropTypes.bool,
    has_photos: React.PropTypes.bool,
}).isRequired;

const reportMightBeUseful = tripReport => {
    return tripReport.has_gps || tripReport.has_photos || tripReport.title || tripReport.route;
};

const TripReportLink = props => {
    const report = props.report;
    const onClick = () => trackOutboundLink(report.link);
    const headline = (report.title && report.route) ?
        `${report.title} | ${report.route}` : report.title || report.route;
    const headlineElement = <span className={styles.tripReportHeadline}>{headline}</span>;
    const {date} = report;
    const dateElement = <span className={styles.tripReportDate}>{date.toISOString().slice(0, 10)}</span>;
    const siteElement = <span className={styles.tripReportSite}>{report.site}</span>;
    const photoElement = (
        report.has_photos ?
        <span className={styles.hasPhotos} title="Photos">📷</span> :
        <span className={styles.noPhotos} />
    );
    const gpsElement = (
        report.has_gps ?
        <span className={styles.hasGps} title="GPS track">🛰</span> :
        <span className={styles.noGps} />
    );

    return (
        <li className={styles.tripReportResult}>
            <a href={report.link} onClick={onClick} target="_blank" title={headline}>
                {dateElement}{headlineElement} {photoElement}{gpsElement}{siteElement}
            </a>
        </li>
    );
};

TripReportLink.propTypes = {
    report: tripReportProp,
};

export const TripReportResults = React.createClass({
    propTypes: {
        tripReports: React.PropTypes.arrayOf(tripReportProp).isRequired,
        place: React.PropTypes.object,
        isFetching: React.PropTypes.bool,
        dispatch: React.PropTypes.func,
    },
    componentWillMount() {
        this.props.dispatch(fetchTripReports(this.props.place));
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.place.id !== nextProps.place.id) {
            this.props.dispatch(fetchTripReports(nextProps.place));
        }
    },
    render() {
        const description = this.props.isFetching ? (
          <div className={styles.tripReportsLoadingIndicator}>
              Searching Peakbagger, SummitPost, CascadeClimbers, and NW Hikers...
              <br />
              <img src={loadingIndicatorImage} />
          </div>
        ) : (
          <span className={styles.tripReportsInfo}>From Peakbagger, SummitPost, Cascade Climbers, and NW Hikers</span>
        );

        const reports = this.props.tripReports;
        const reportLinks = _.map(
            reports.filter(reportMightBeUseful),
            report => {
                return <TripReportLink report={report} key={JSON.stringify(report)} />;
            }
        );

        return (
            <ContainerWithTitle title="Trip Reports">
                {description}
                <ul className={styles.tripReportList}>
                    {reportLinks}
                </ul>
            </ContainerWithTitle>
        );
    },
});
