<script>
    import { dayjs } from "@deboxsoft/module-core"
    import DatePicker from "@deboxsoft/svelte-components/datepicker/DatePicker.svelte"

    export let startDate;
    export let endDate = undefined;
    export let range = false
    export let format = "DD-MM-YYYY";
    export let result = {};

    $: {
        result = range ? {startDate, endDate} : {startDate, endDate: null};
    }
    function selectHandler({detail}) {
        result = {}
        if (range) {
            result.startDate = detail.start ? dayjs(detail.start, format).toISOString() : null;
            result.endDate = detail.end ? dayjs(detail.end, format).toISOString(): null;
        } else {
            result.startDate = detail.value ? dayjs(detail.value, format).toISOString(): null;
            result.endDate = null
        }
    }

</script>

<DatePicker {...$$restProps} value="{startDate}" start={startDate} end="{endDate}" {range} on:select={selectHandler} format="{{
    toValue: (date) => {
        return dayjs(date).toDate()
        },
    toDisplay: (date) => dayjs(date).format(format)
}}">
    <slot />
</DatePicker>
