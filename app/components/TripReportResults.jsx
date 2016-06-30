import React from 'react';
import _ from 'lodash';

import TripReportsStore from '../store/TripReportsStore'
import {trackOutboundLink} from '../ga'


const tripReportProp = React.PropTypes.shape({
    site: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    date: React.PropTypes.object.isRequired,
    title: React.PropTypes.string,
    route: React.PropTypes.string.isRequired,
    has_gps: React.PropTypes.bool,
    has_photos: React.PropTypes.bool,
}).isRequired;


const TripReportLink = React.createClass({
    propTypes: {report: tripReportProp},
    render(){
        const report = this.props.report;
        const onClick = () => trackOutboundLink(report.link);
        const headline = (report.title && report.route) ? 
            `${report.title} | ${report.route}` : `${report.title}${report.route}`
        return <div className="trip-report-result">
            <a href={report.link} onClick={onClick} target="_blank" title={headline}>
                <div className="trip-report-date">{report.date}</div>
                <div className="trip-report-headline">{headline}</div>
            </a>
        </div>
    }
});

const TripReportResults = React.createClass({
    render(){
        const reports = TripReportsStore.getTripReports();
        const reportLinks = _.map(
            reports,
            (report) => {
                return <TripReportLink report={report}/>;
            }
        )

        return <div className="research-suggestions">
            {reportLinks}
        </div>
    }
})

export default TripReportResults;