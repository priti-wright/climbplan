import React from 'react';
import _ from 'lodash';

import TripReportsStore from '../store/TripReportsStore'
import {trackOutboundLink} from '../ga'


const tripReportProp = React.PropTypes.shape({
    site: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    date: React.PropTypes.object.isRequired,
    title: React.PropTypes.string,
    route: React.PropTypes.string,
    has_gps: React.PropTypes.bool,
    has_photos: React.PropTypes.bool,
}).isRequired;

const reportMightBeUseful = (tripReport) => {
    const hasTitleOrRoute = (
        tripReport.title ||
        // TODO issue #2 : PeakBagger results sometimes just have a space character for a route
        (tripReport.route && tripReport.route != '&nbsp;')
    );
    return tripReport.has_gps || tripReport.has_photos || hasTitleOrRoute;
}

const padTwodigits = (num) => {
    const str = num.toString();
    return (str.length > 1)?
        str : `0${str}`;
}

const TripReportLink = React.createClass({
    propTypes: {report: tripReportProp},
    render(){
        const report = this.props.report;
        const onClick = () => trackOutboundLink(report.link);
        const headline = (report.title && report.route) ? 
            `${report.title} | ${report.route}` : report.title || report.route;
        const headlineElement = <span className="trip-report-headline">{headline}</span>;
        const {date} = report;
        const dateElement = <span className="trip-report-date">{date.getFullYear()}-{padTwodigits(date.getMonth())}-{padTwodigits(date.getDate())}</span>;
        const siteElement = <span className="trip-report-site">{report.site}</span>;
        const photoElement = report.has_photos ? <span className="has-photos" title="Photos">📷</span> : <span className="no-photos"/>;
        const gpsElement = report.has_gps ? <span className="has-gps" title="GPS track">🛰</span> : <span className="no-gps"/>;

        return <div className="trip-report-result">
            <a href={report.link} onClick={onClick} target="_blank" title={headline}>
                {dateElement}{headlineElement} {photoElement}{gpsElement}{siteElement}
            </a>
        </div>
    }
});

const TripReportResults = React.createClass({
    render(){
        const reports = TripReportsStore.getTripReports();
        const reportLinks = _.map(
            reports.filter(reportMightBeUseful),
            (report) => {
                return <TripReportLink report={report}/>;
            }
        )

        return <div className="research-suggestions">
            <h1 className="section-title">Trip Reports</h1>
            From Peakbagger, SummitPost and Cascade Climbers search
            {reportLinks}
        </div>
    }
})

export default TripReportResults;