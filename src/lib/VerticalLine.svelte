<script lang="ts">
    interface Props {
        height: string;
    }
    
    const { height }: Props = $props();
    </script>
    
    <style>
        * {
            /*#E6E8EC*/
            border-left: 2px solid grey;
                    border-radius: 2px;
        }
    </style>
    
    <div style:height={height}></div>