import React from 'react';
import _ from 'lodash';

import loadingIndicatorImage from '../static/loadingIndicator.gif'
import TripReportsStore, {
    statusNoInput,
    statusLoaded,
    statusSearching
} from '../store/TripReportsStore'
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
    return tripReport.has_gps || tripReport.has_photos || tripReport.title || tripReport.route;
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
        const dateElement = <span className="trip-report-date">{date.toISOString().slice(0, 10)}</span>;
        const siteElement = <span className="trip-report-site">{report.site}</span>;
        const photoElement = report.has_photos ? <span className="has-photos" title="Photos">📷</span> : <span className="no-photos"/>;
        const gpsElement = report.has_gps ? <span className="has-gps" title="GPS track">🛰</span> : <span className="no-gps"/>;

        return <li className="trip-report-result">
            <a href={report.link} onClick={onClick} target="_blank" title={headline}>
                {dateElement}{headlineElement} {photoElement}{gpsElement}{siteElement}
            </a>
        </li>
    }
});


const TripReportResults = React.createClass({
    propTypes: {
        tripReports: React.PropTypes.arrayOf(tripReportProp).isRequired,
        tripReportsStatus: React.PropTypes.string.isRequired,
    },
    render(){
        const status = this.props.tripReportsStatus;

        const loadingIndicator = (status == statusSearching) ?
            <div className="trip-reports-loading-indicator">
                Searching Peakbagger, SummitPost and CascadeClimbers...
                <br/>
                <img src={loadingIndicatorImage}></img>
            </div> : null
        const loadedInfo = (status == statusLoaded) ?
            <span>From Peakbagger, SummitPost and Cascade Climbers search</span> : null;
        const noInputInfo = (status == statusNoInput) ?
            <span>Enter a mountain name in the search bar to fetch reports!</span> : null

        const reports = this.props.tripReports;
        const reportLinks = _.map(
            reports.filter(reportMightBeUseful),
            (report) => {
                return <TripReportLink report={report} key={JSON.stringify(report)}/>;
            }
        )

        return <div className="trip-reports">
            <h1 className="section-title">Trip Reports</h1>
            {noInputInfo}
            {loadedInfo}
            <ul>{reportLinks}</ul>
            {loadingIndicator}
        </div>
    }
})



const TripReportResultsWrapper = React.createClass({
    render(){
        return <TripReportResults
            tripReports={TripReportsStore.getTripReports()}
            tripReportsStatus={TripReportsStore.getStatus()}
        />
    }
});

export default TripReportResultsWrapper;