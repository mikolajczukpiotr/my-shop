import React, { ComponentType } from "react";

interface WithDataFetchingProps {
  loading: boolean;
  error: Error | null;
  data: any;
}

interface WithDataFetchingState {
  loading: boolean;
  error: Error | null;
  data: any;
}

interface FetcherProps {
  fetchData: () => Promise<any>;
}

const withDataFetching = <P extends object>(
  WrappedComponent: ComponentType<P & WithDataFetchingProps>,
  fetchData: () => Promise<any>
) => {
  return class extends React.Component<
    P & FetcherProps,
    WithDataFetchingState
  > {
    constructor(props: P & FetcherProps) {
      super(props);
      this.state = {
        loading: true,
        error: null,
        data: null,
      };
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData = async () => {
      try {
        this.setState({ loading: true, error: null });
        const data = await (this.props.fetchData
          ? this.props.fetchData()
          : fetchData());
        this.setState({ loading: false, data });
      } catch (error) {
        this.setState({ loading: false, error: error as Error });
      }
    };

    render() {
      const { loading, error, data } = this.state;
      const { fetchData: _, ...rest } = this.props as any;

      return (
        <WrappedComponent
          loading={loading}
          error={error}
          data={data}
          {...(rest as P)}
        />
      );
    }
  };
};

export default withDataFetching;
