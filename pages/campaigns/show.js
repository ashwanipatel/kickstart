import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../components/Layout';
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {

    static async getInitialProps(props) {
        console.log(props.query.address);
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary);
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            minimumContribution,
            requestCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                description: 'The Manager created this Campaign and can request to withdraw money',
                meta: 'Address of Manager',
                style: { overflowWrap: 'break-word' }
            },

            {
                header: minimumContribution,
                description: 'You must contribute atleast this much of wei to become an approver',
                meta: 'Minimum Contribution (Wei)',
                style: { overflowWrap: 'break-word' }
            },

            {
                header: requestCount,
                description: 'A request tries to withdraw money from the contract. Request must me approved by approvers',
                meta: 'Number of Requests',
                style: { overflowWrap: 'break-word' }
            },

            {
                header: approversCount,
                description: 'Numbers of people who have allready donated to this campaign',
                meta: 'Number of Approvers',
                style: { overflowWrap: 'break-word' }
            },

            {
                header: web3.utils.fromWei(balance, 'ether'),
                description: 'The balance is how much money this campaign has left',
                meta: 'Campaign Balance (ether)',
                style: { overflowWrap: 'break-word' }
            }
        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>



            </Layout>
        );
    }
}

export default CampaignShow;