import useMediaQuery from '@mui/material/useMediaQuery';

const useResponsiveQueries = () => {
    const xlMatch = useMediaQuery('(min-width:1536px)');
    const lgMatch = useMediaQuery('(min-width:1200px)');
    const mdMatch = useMediaQuery('(min-width:900px)');
    const smMatch = useMediaQuery('(min-width:600px)');
    if(xlMatch){
        return "xl";
    }
    if(lgMatch){
        return "lg";
    }
    if(mdMatch){
        return "md";
    }
    if(smMatch){
        return "sm";
    }
    return "xs";
};

export default useResponsiveQueries;