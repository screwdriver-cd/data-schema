'use strict';

const Joi = require('joi');
const Regex = require('./regex');

const SCHEMA_VPC_OBJECT = Joi.object({
    vpcId: Joi.string()
        .regex(Regex.VPC_ID)
        .max(128)
        .description('VPC ID')
        .example('vpc-1a2b3c4d')
        .required(),
    securityGroupIds: Joi.array()
        .items(
            Joi.string()
                .regex(Regex.SECURITY_GROUP_ID)
                .max(128)
                .description('Security group ID')
                .example('sg-51530134')
        )
        .min(1)
        .label('List of security group IDs')
        .required(),
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
        .required()
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
        .description('Region where service and build will run, build region can be overridden')
        .default('us-west-2')
        .example('us-west-2'),
    buildRegion: Joi.string()
        .regex(Regex.REGION)
        .max(64)
        .description('Region where builds will run if different from service region')
        .default('')
        .example('us-east-2')
        .allow('')
        .optional(),
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
        .description('Cluster name required if executor is eks')
        .example('sd-build-eks'),
    cpuLimit: Joi.string()
        .max(4)
        .description('CPU Limit for pod in EKS Cluster')
        .example('2Gi'),
    memoryLimit: Joi.string()
        .max(4)
        .description('Memory Limit for pod in EKS Cluster')
        .example('4Gi'),
    executorLogs: Joi.boolean()
        .optional()
        .default(false)
        .description('Enable debug logs for executor codebuild'),
    launcherImage: Joi.string()
        .description('Screwdriver launcher image in user Registry')
        .example('123456789012.dkr.ecr.us-east-2.amazonaws.com/screwdriver-hub:launcherv6.4'),
    launcherVersion: Joi.string()
        .description('Screwdriver launcher version')
        .example('v6.4'),
    privilegedMode: Joi.boolean()
        .optional()
        .default(false)
        .description('Enable privileged mode for container'),
    computeType: Joi.string()
        .valid(
            'BUILD_GENERAL1_SMALL',
            'BUILD_GENERAL1_LARGE',
            'BUILD_GENERAL1_MEDIUM',
            'BUILD_GENERAL1_LARGE',
            'BUILD_GENERAL1_2XLARGE',
            'BUILD_GENERAL1_LARGE',
            'BUILD_GENERAL1_MEDIUM',
            'BUILD_GENERAL1_LARGE'
        )
        .optional()
        .default('BUILD_GENERAL1_SMALL')
        .description('CodeBuild compute type'),
    environmentType: Joi.string()
        .optional()
        .valid('ARM_CONTAINER', 'LINUX_CONTAINER', 'LINUX_GPU_CONTAINER')
        .default('LINUX_CONTAINER')
        .description('CodeBuild environment type')
});

module.exports = {
    provider: SCHEMA_PROVIDER
};
