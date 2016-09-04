import _ from 'lodash';
import React from 'react';

import loadingIndicatorImage from '../static/loadingIndicator.gif';
import {fetchTripReports} from '../actions/tripReports';
import {trackOutboundLink} from '../ga';


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
    const headlineElement = <span className="trip-report-headline">{headline}</span>;
    const {date} = report;
    const dateElement = <span className="trip-report-date">{date.toISOString().slice(0, 10)}</span>;
    const siteElement = <span className="trip-report-site">{report.site}</span>;
    const photoElement = (
        report.has_photos ?
        <span className="has-photos" title="Photos">📷</span> :
        <span className="no-photos" />
    );
    const gpsElement = (
        report.has_gps ?
        <span className="has-gps" title="GPS track">🛰</span> :
        <span className="no-gps" />
    );

    return (
        <li className="trip-report-result">
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
            this.props.dispatch(fetchTripReports(this.props.place));
        }
    },
    render() {
        const description = this.props.isFetching ? (
          <div className="trip-reports-loading-indicator">
              Searching Peakbagger, SummitPost and CascadeClimbers...
              <br />
              <img src={loadingIndicatorImage} />
          </div>
        ) : (
          <span className="trip-reports-info">From Peakbagger, SummitPost and Cascade Climbers</span>
        );

        const reports = this.props.tripReports;
        const reportLinks = _.map(
            reports.filter(reportMightBeUseful),
            report => {
                return <TripReportLink report={report} key={JSON.stringify(report)} />;
            }
        );

        return (
            <div className="trip-reports">
                <h1 className="section-title">Trip Reports</h1>
                {description}
                <ul>{reportLinks}</ul>
            </div>
        );
    },
});
