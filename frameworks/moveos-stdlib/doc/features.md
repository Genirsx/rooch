
<a name="0x2_features"></a>

# Module `0x2::features`

Defines feature flags for Rooch frameworks. Those are used in implementations of features in
the moveos-stdlib, rooch-framework and other frameworks.

============================================================================================
Feature Flag Definitions

Each feature flag should come with documentation which justifies the need of the flag.
Introduction of a new feature flag requires approval of framework owners. Be frugal when
introducing new feature flags, as too many can make it hard to understand the code.

Note that removing a feature flag still requires the function which tests for the feature
to stay around for compatibility reasons, as it is a public function. However, once the
feature flag is disabled, those functions can constantly return true.


-  [Resource `FeatureStore`](#0x2_features_FeatureStore)
-  [Constants](#@Constants_0)
-  [Function `init_feature_store`](#0x2_features_init_feature_store)
-  [Function `change_feature_flags`](#0x2_features_change_feature_flags)
-  [Function `is_enabled`](#0x2_features_is_enabled)
-  [Function `get_localnet_feature`](#0x2_features_get_localnet_feature)
-  [Function `localnet_enabled`](#0x2_features_localnet_enabled)
-  [Function `ensure_localnet_enabled`](#0x2_features_ensure_localnet_enabled)
-  [Function `get_devnet_feature`](#0x2_features_get_devnet_feature)
-  [Function `devnet_enabled`](#0x2_features_devnet_enabled)
-  [Function `ensure_devnet_enabled`](#0x2_features_ensure_devnet_enabled)
-  [Function `get_testnet_feature`](#0x2_features_get_testnet_feature)
-  [Function `testnet_enabled`](#0x2_features_testnet_enabled)
-  [Function `ensure_testnet_enabled`](#0x2_features_ensure_testnet_enabled)
-  [Function `get_module_template_feature`](#0x2_features_get_module_template_feature)
-  [Function `module_template_enabled`](#0x2_features_module_template_enabled)
-  [Function `ensure_module_template_enabled`](#0x2_features_ensure_module_template_enabled)
-  [Function `get_module_publishing_allowlist_feature`](#0x2_features_get_module_publishing_allowlist_feature)
-  [Function `module_publishing_allowlist_enabled`](#0x2_features_module_publishing_allowlist_enabled)
-  [Function `ensure_module_publishing_allowlist_enabled`](#0x2_features_ensure_module_publishing_allowlist_enabled)
-  [Function `get_wasm_feature`](#0x2_features_get_wasm_feature)
-  [Function `wasm_enabled`](#0x2_features_wasm_enabled)
-  [Function `ensure_wasm_enabled`](#0x2_features_ensure_wasm_enabled)
-  [Function `get_value_size_gas_feature`](#0x2_features_get_value_size_gas_feature)
-  [Function `value_size_gas_enabled`](#0x2_features_value_size_gas_enabled)
-  [Function `ensure_value_size_gas_enabled`](#0x2_features_ensure_value_size_gas_enabled)
-  [Function `get_compatibility_checker_v2_feature`](#0x2_features_get_compatibility_checker_v2_feature)
-  [Function `compatibility_checker_v2_enabled`](#0x2_features_compatibility_checker_v2_enabled)
-  [Function `ensure_compatibility_checker_v2_enabled`](#0x2_features_ensure_compatibility_checker_v2_enabled)
-  [Function `get_all_features`](#0x2_features_get_all_features)


<pre><code><b>use</b> <a href="core_addresses.md#0x2_core_addresses">0x2::core_addresses</a>;
<b>use</b> <a href="object.md#0x2_object">0x2::object</a>;
</code></pre>



<a name="0x2_features_FeatureStore"></a>

## Resource `FeatureStore`

The enabled features, represented by a bitset stored on chain.


<pre><code><b>struct</b> <a href="features.md#0x2_features_FeatureStore">FeatureStore</a> <b>has</b> key
</code></pre>



<a name="@Constants_0"></a>

## Constants


<a name="0x2_features_COMPATIBILITY_CHECKER_V2"></a>

Whether to enable compatibility checker v2


<pre><code><b>const</b> <a href="features.md#0x2_features_COMPATIBILITY_CHECKER_V2">COMPATIBILITY_CHECKER_V2</a>: u64 = 8;
</code></pre>



<a name="0x2_features_DEVNET"></a>

This feature will only be enabled on devnet.


<pre><code><b>const</b> <a href="features.md#0x2_features_DEVNET">DEVNET</a>: u64 = 2;
</code></pre>



<a name="0x2_features_EAPI_DISABLED"></a>



<pre><code><b>const</b> <a href="features.md#0x2_features_EAPI_DISABLED">EAPI_DISABLED</a>: u64 = 2;
</code></pre>



<a name="0x2_features_EINVALID_FEATURE"></a>



<pre><code><b>const</b> <a href="features.md#0x2_features_EINVALID_FEATURE">EINVALID_FEATURE</a>: u64 = 1;
</code></pre>



<a name="0x2_features_LOCALNET"></a>

This feature will only be enabled on localnet.


<pre><code><b>const</b> <a href="features.md#0x2_features_LOCALNET">LOCALNET</a>: u64 = 1;
</code></pre>



<a name="0x2_features_MODULE_PUBLISHING_ALLOWLIST"></a>

Whether enable the allowlist feature for publishing modules.


<pre><code><b>const</b> <a href="features.md#0x2_features_MODULE_PUBLISHING_ALLOWLIST">MODULE_PUBLISHING_ALLOWLIST</a>: u64 = 5;
</code></pre>



<a name="0x2_features_MODULE_TEMPLATE"></a>

Whether allowing replacing module's address, module identifier, struct identifier
and constant address.
This feature is used for creating a new module through a module template bytes,
thus developers can used to publish new modules in Move.


<pre><code><b>const</b> <a href="features.md#0x2_features_MODULE_TEMPLATE">MODULE_TEMPLATE</a>: u64 = 4;
</code></pre>



<a name="0x2_features_TESTNET"></a>

This feature will only be enabled on testnet, devnet or localnet.


<pre><code><b>const</b> <a href="features.md#0x2_features_TESTNET">TESTNET</a>: u64 = 3;
</code></pre>



<a name="0x2_features_VALUE_SIZE_GAS"></a>

Whether to enable size-based gas fee for adding field values


<pre><code><b>const</b> <a href="features.md#0x2_features_VALUE_SIZE_GAS">VALUE_SIZE_GAS</a>: u64 = 7;
</code></pre>



<a name="0x2_features_WASM"></a>

Whether enable the wasm feature.


<pre><code><b>const</b> <a href="features.md#0x2_features_WASM">WASM</a>: u64 = 6;
</code></pre>



<a name="0x2_features_init_feature_store"></a>

## Function `init_feature_store`



<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="features.md#0x2_features_init_feature_store">init_feature_store</a>()
</code></pre>



<a name="0x2_features_change_feature_flags"></a>

## Function `change_feature_flags`

Enable or disable features. Only the framework signers can call this function.


<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_change_feature_flags">change_feature_flags</a>(framework: &<a href="">signer</a>, enable: <a href="">vector</a>&lt;u64&gt;, disable: <a href="">vector</a>&lt;u64&gt;)
</code></pre>



<a name="0x2_features_is_enabled"></a>

## Function `is_enabled`

Check whether the feature is enabled.
All features are enabled for system reserved accounts.


<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_is_enabled">is_enabled</a>(feature: u64): bool
</code></pre>



<a name="0x2_features_get_localnet_feature"></a>

## Function `get_localnet_feature`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_get_localnet_feature">get_localnet_feature</a>(): u64
</code></pre>



<a name="0x2_features_localnet_enabled"></a>

## Function `localnet_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_localnet_enabled">localnet_enabled</a>(): bool
</code></pre>



<a name="0x2_features_ensure_localnet_enabled"></a>

## Function `ensure_localnet_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_ensure_localnet_enabled">ensure_localnet_enabled</a>()
</code></pre>



<a name="0x2_features_get_devnet_feature"></a>

## Function `get_devnet_feature`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_get_devnet_feature">get_devnet_feature</a>(): u64
</code></pre>



<a name="0x2_features_devnet_enabled"></a>

## Function `devnet_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_devnet_enabled">devnet_enabled</a>(): bool
</code></pre>



<a name="0x2_features_ensure_devnet_enabled"></a>

## Function `ensure_devnet_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_ensure_devnet_enabled">ensure_devnet_enabled</a>()
</code></pre>



<a name="0x2_features_get_testnet_feature"></a>

## Function `get_testnet_feature`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_get_testnet_feature">get_testnet_feature</a>(): u64
</code></pre>



<a name="0x2_features_testnet_enabled"></a>

## Function `testnet_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_testnet_enabled">testnet_enabled</a>(): bool
</code></pre>



<a name="0x2_features_ensure_testnet_enabled"></a>

## Function `ensure_testnet_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_ensure_testnet_enabled">ensure_testnet_enabled</a>()
</code></pre>



<a name="0x2_features_get_module_template_feature"></a>

## Function `get_module_template_feature`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_get_module_template_feature">get_module_template_feature</a>(): u64
</code></pre>



<a name="0x2_features_module_template_enabled"></a>

## Function `module_template_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_module_template_enabled">module_template_enabled</a>(): bool
</code></pre>



<a name="0x2_features_ensure_module_template_enabled"></a>

## Function `ensure_module_template_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_ensure_module_template_enabled">ensure_module_template_enabled</a>()
</code></pre>



<a name="0x2_features_get_module_publishing_allowlist_feature"></a>

## Function `get_module_publishing_allowlist_feature`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_get_module_publishing_allowlist_feature">get_module_publishing_allowlist_feature</a>(): u64
</code></pre>



<a name="0x2_features_module_publishing_allowlist_enabled"></a>

## Function `module_publishing_allowlist_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_module_publishing_allowlist_enabled">module_publishing_allowlist_enabled</a>(): bool
</code></pre>



<a name="0x2_features_ensure_module_publishing_allowlist_enabled"></a>

## Function `ensure_module_publishing_allowlist_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_ensure_module_publishing_allowlist_enabled">ensure_module_publishing_allowlist_enabled</a>()
</code></pre>



<a name="0x2_features_get_wasm_feature"></a>

## Function `get_wasm_feature`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_get_wasm_feature">get_wasm_feature</a>(): u64
</code></pre>



<a name="0x2_features_wasm_enabled"></a>

## Function `wasm_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_wasm_enabled">wasm_enabled</a>(): bool
</code></pre>



<a name="0x2_features_ensure_wasm_enabled"></a>

## Function `ensure_wasm_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_ensure_wasm_enabled">ensure_wasm_enabled</a>()
</code></pre>



<a name="0x2_features_get_value_size_gas_feature"></a>

## Function `get_value_size_gas_feature`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_get_value_size_gas_feature">get_value_size_gas_feature</a>(): u64
</code></pre>



<a name="0x2_features_value_size_gas_enabled"></a>

## Function `value_size_gas_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_value_size_gas_enabled">value_size_gas_enabled</a>(): bool
</code></pre>



<a name="0x2_features_ensure_value_size_gas_enabled"></a>

## Function `ensure_value_size_gas_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_ensure_value_size_gas_enabled">ensure_value_size_gas_enabled</a>()
</code></pre>



<a name="0x2_features_get_compatibility_checker_v2_feature"></a>

## Function `get_compatibility_checker_v2_feature`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_get_compatibility_checker_v2_feature">get_compatibility_checker_v2_feature</a>(): u64
</code></pre>



<a name="0x2_features_compatibility_checker_v2_enabled"></a>

## Function `compatibility_checker_v2_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_compatibility_checker_v2_enabled">compatibility_checker_v2_enabled</a>(): bool
</code></pre>



<a name="0x2_features_ensure_compatibility_checker_v2_enabled"></a>

## Function `ensure_compatibility_checker_v2_enabled`



<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_ensure_compatibility_checker_v2_enabled">ensure_compatibility_checker_v2_enabled</a>()
</code></pre>



<a name="0x2_features_get_all_features"></a>

## Function `get_all_features`

Helper for getting all features.
Update this once new feature added.


<pre><code><b>public</b> <b>fun</b> <a href="features.md#0x2_features_get_all_features">get_all_features</a>(): <a href="">vector</a>&lt;u64&gt;
</code></pre>
