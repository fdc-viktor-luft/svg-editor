// @flow

import React from 'react';

export const Label = ({ label }: { label: string, required?: boolean }) => <label>{label}</label>;

export const DisplayError = ({ error }: { error: string }) => <span className="invalid-feedback">{error}</span>;
