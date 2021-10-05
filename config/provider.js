'use strict';

const Joi = require('joi');
const Regex = require('./regex');

const SCHEMA_VPC_OBJECT = Joi.object({
    vpcId: Joi.string()
        .regex(Regex.VPC_ID)
        .max(128)
        .description('VPC ID')
        .example('vpc-1a2b3c4d'),
    securityGroupIds: Joi.array()
        .items(
            Joi.string()
                .regex(Regex.SECURITY_GROUP_ID)
                .max(128)
                .description('Security group ID')
                .example('sg-51530134')
        )
        .min(1)
        .label('List of security group IDs'),
    subnetIds: Joi.array()
        .items(
            Joi.string()
                .regex(Regex.SUBNET_ID)
                .max(128)
                .description('Subnet ID')
                .example('subnet-01234567890abcdef')
        )
        .min(1)
        .label('List of subnet IDs')
});

const SCHEMA_PROVIDER = Joi.object().keys({
    name: Joi.string()
        .valid('aws')
        .max(64)
        .description('Provider name')
        .example('aws'),
    region: Joi.string()
        .regex(Regex.REGION)
        .max(64)
        .description('Region')
        .example('us-west-2'),
    accountId: Joi.alternatives()
        .try(
            Joi.string()
                .regex(Regex.ACCOUNT_ID)
                .max(12),
            Joi.number()
                .integer()
                .min(12)
        )
        .description('Account ID')
        .example('123456789012'),
    vpc: SCHEMA_VPC_OBJECT.optional(),
    role: Joi.string()
        .regex(Regex.ROLE_ARN)
        .max(512)
        .description('Role ARN')
        .example('arn:aws:iam::123456789012:role/aws-service-role/amazonaws.com/AWSServiceRole'),
    executor: Joi.string()
        .valid('sls', 'eks')
        .max(64)
        .description('Executor name')
        .example('eks'),
    clusterName: Joi.string()
        .max(128)
        .description('Cluster name')
        .example('sd-build-eks')
});

module.exports = {
    provider: SCHEMA_PROVIDER
};
