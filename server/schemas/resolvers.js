const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = ('../utils/auth.js');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select("-__v -password");
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
    },
};

module.exports = resolvers